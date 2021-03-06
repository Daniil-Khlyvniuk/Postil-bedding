import React from 'react'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { useStyles } from './styles'
import { useSelector, useDispatch } from 'react-redux'
import modalActions from '../../../../store/modal'
import CartModal from '../../../Modal/CartModal/CartModal'
import { shoppingBagSelectors } from '../../../../store/shoppingBag'
import { Box } from '@mui/system'
import { useLocation } from 'react-router'

const Carticon = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const handleOpen = (content) => dispatch(modalActions.modalToggle(content))
	const shoppingBag = useSelector(shoppingBagSelectors.getShoppingBag())
	const { pathname } = useLocation()

	return (
		<IconButton
			aria-label="cart"
			sx={{ padding: 0 }}
			title='Cart'
			onClick={() => handleOpen(pathname !== '/cart' && <CartModal />)}
			data-testid='navbar-cart-icon'
		>
			<Badge badgeContent={shoppingBag?.length} color="success">
				<Box className={classes.navbarLink}>
					<LocalMallIcon />
				</Box>
			</Badge>
		</IconButton>
	)
}

export default Carticon