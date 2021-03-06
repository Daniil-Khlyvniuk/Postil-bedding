import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { filterOperations, filterSelectors } from '../../store/filter'
import { productsOperations } from '../../store/products'
import { settingsSelectors } from '../../store/settings'
import settingsApi from '../API/settingsApi'
import { returnObjectWithoutZeroVal } from '../helpers/objectHelper'
import { parseQueryStringWithNoZero, returnMode } from '../helpers/stringHelper'
import {snackActions} from './useSnackBarUtils'


const useFilterHandler = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const isLaunchedByUser = useSelector(filterSelectors.getIsLaunchedByUser())
	const settingsRedux = useSelector(settingsSelectors.getData())

	const getSettings = async () => {
		try {
			const settingsRes = await settingsApi.getSettings()
			const mode = returnMode()
			return settingsRes.data[0][mode]['settings']
		} catch (err) {
			snackActions.warning('Settings request err')
		}
	}

	//handle action, handle user activity init, sets filter value via action
	const registerUserActivity = (action, value) => {
		if (!action || !value) {
			return
		}
		const actionName = 'handle' + action[0].toUpperCase() + action.slice(1)

		//set defaults params every filters change
		dispatch(filterOperations.handleStartPage(1))
		dispatch(filterOperations.setIsLaunchedByUser(true))
		dispatch(filterOperations.setInfinityScrollHasMore(true))

		dispatch(filterOperations.filtersHandler(actionName, value, history))
		return true
	}

	const handleFilterChange = (action, value) => {
		if (registerUserActivity(action, value)) {
			dispatch(productsOperations.fetchProductsByFilter())
		}
	}

	const handleInfinitiScroll = (action, value) => {
		if (registerUserActivity(action, value)) {
			dispatch(productsOperations.fetchProductsByNextPage())
		}
	}

	const onLoadingPage = async () => {
		//get settings here, becouse from redux return null - async
		let settings
		if (!settingsRedux) {
			settings = await getSettings()
		} else {
			settings = settingsRedux
		}

		if (!isLaunchedByUser && settings) {
			const urlParams = parseQueryStringWithNoZero(history.location.search)

			//delete from object values with 0
			settings = returnObjectWithoutZeroVal(settings)

			dispatch(filterOperations.setFiltersFromUri(
				{ ...settings, ...urlParams }
			))
			dispatch(productsOperations.fetchProductsByFilter())
		}
	}

	const restoreDefaults = () => {
		dispatch(filterOperations.setIsLaunchedByUser(false))
	}

	return {
		handleFilterChange,
		onLoadingPage,
		handleInfinitiScroll,
		restoreDefaults
	}
}

export default useFilterHandler
