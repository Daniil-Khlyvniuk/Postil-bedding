import React from 'react'
import * as Yup from 'yup'
import { Container, Grid, Typography, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { phoneRegExp , alphabetReg} from './data/Regex'
import { userOperations, userSelectors } from '../../../store/user'
import { useSelector, useDispatch } from 'react-redux'
import { updateData, updatePassword } from '../../../utils/API/userAPI'
import countries from './data/countries.json'
import TextInput from './FormUI/Textfield'
import SelectInput from './FormUI/SelectInput'
import ButtonInput from './FormUI/ButtonInput'
import Loader from '../../UI/Loader/Loader'
import CheckboxInput from './FormUI/CheckboxInput'
import {snackActions} from '../../../utils/customHooks/useSnackBarUtils'

const FORM_VALIDATION = Yup.object().shape({
	firstName: Yup.string().matches(alphabetReg, 'Only alphabet characters are allowed ').min(2, 'Enter a valid name').max(30,'Enter a valid name').required('Required'),
	lastName: Yup.string().matches(alphabetReg, 'Only alphabet characters are allowed ').min(2, 'Enter a valid lastname').max(30,'Enter a valid lastname').required('Required'),
	email: Yup.string().email('Invalid email'),
	phone: Yup.string()
		.matches(phoneRegExp, 'Please enter a valid phone number')
	,
	address: Yup.string(),
	city: Yup.string(),
	country: Yup.string(),
	zip: Yup.string().matches(/^[0-9]+$/, 'Must be only numbers')
		.max(6, 'Not valid zip code')
		.min(4, 'Not valid zip code'),
	oldPass: Yup.string(),
	password: Yup.string()
		.min(7, 'Password must be 7 digits minimum')
		.max(30, 'Password must be 30 digits maximum'),
	confirmPass: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').when('password', {
		is: value => value && value.length > 0,
		then: Yup.string().required('Field is required')
	}),
	subscribe: Yup.bool()

})

const UserForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(userSelectors.getData())

	const INITIAL_FORM_STATE = {
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
		phone: user?.phone || '',
		address: user?.address || '',
		city: user?.city || '',
		country: user?.country || '',
		zip: user?.zip || '',
		oldPass: '',
		password: '',
		confirmPass: '',
		subscribe: user?.subscribe || false
	}

	if (!user) {
		return <Loader />
	}
	return (
		<Box my={2}>
			<Typography
				variant={'h6'}
				fontSize={'16px'}
				component={'div'}
				sx={{ mb: 3, mt: 3.5 }}
			>
				Personal information
			</Typography>
			<Box>
				<Grid container>
					<Grid item xs={12}>
						<Container maxWidth="md">
							<Formik
								initialValues={{ ...INITIAL_FORM_STATE }}
								validationSchema={FORM_VALIDATION}
								onSubmit={(values) => {

									if (values.oldPass === '') {
										const update = {
											...user,
											firstName: values.firstName,
											lastName: values.lastName,
											email: values.email,
											phone: values.phone,
											address: values.address,
											city: values.city,
											country: values.country,
											subscribe: values.subscribe

										}
										updateData(update).then(() => {

											dispatch(userOperations.setNewData(update))
											snackActions.success('Successfully changed')
										}).catch((err) => {
											const message = err.response.data.password ? err.response.data.password : 'Something wrong with your data'
											snackActions.error(message)
										})
									}


									if(values.oldPass.length> 2 && values.password === ''){
										snackActions.warning('Enter new password')
										// eslint-disable-next-line max-len
									} else if (values.oldPass.length > 2 && values.password.length > 2) {

										const passwords = {
											'password': values.oldPass,
											'newPassword': values.password
										}
										// eslint-disable-next-line no-unused-vars,no-mixed-spaces-and-tabs
										updatePassword(passwords)
											.then((res)=>{
												if(res.data.password){
													snackActions.warning('Wrong Password')
												} else if(res.data.message){
													snackActions.success('Successfully changed')
												}
											}).catch((err) => {
												const message = err.response.data.password ? err.response.data.password : 'Something wrong with your data'
												snackActions.warning(message)

											})
									}


								}}
							>
								{() => {
									return (
										<Form>
											<Grid container spacing={2}>
												<Grid item xs={12} md={6}>
													<TextInput
														data-testid="firstName"
														name="firstName"
														label="First Name"
													/>
												</Grid>
												<Grid item xs={12} md={6}>
													<TextInput
														data-testid="lastName"
														name="lastName"
														label="Last Name"
													/>
												</Grid>
												<Grid item xs={12} md={6}>
													<TextInput
														data-testid="phone"
														name="phone"
														label="Phone number"
													/>
												</Grid>
												<Grid item xs={12} md={6}>
													<TextInput
														data-testid="email"
														name="email"
														label="Email"
													/>
												</Grid>
												<Grid item xs={12}>
													<Typography
														variant={'h6'}
														fontSize={'16px'}
														component={'div'}
														sx={{ my: 2 }}
													>
														Delivery Address
													</Typography>
												</Grid>
												<Grid item md={10} xs={12} >
													<TextInput
														data-testid="address"
														name="address"
														label="Address"
													/>
												</Grid>
												<Grid item md={2} xs={12} >
													<TextInput
														data-testid="zip"
														name="zip"
														label="Zip"
													/>
												</Grid>
												<Grid item xs={12} md={6}>
													<TextInput
														data-testid="city"
														name="city"
														label="City"
													/>
												</Grid>
												<Grid item xs={12} md={6}>
													<SelectInput
														data-testid="country"
														name="country"
														label="Country"
														options={countries}

													/>
												</Grid>
												<Grid item xs={12}>
													<Typography
														variant={'h6'}
														fontSize={'16px'}
														component={'div'}
														sx={{ my: 2}}
													>
														Change Password
													</Typography>
												</Grid>
												<Grid item md={12} xs={12}>
													<TextInput
														data-testid="oldPass"
														name='oldPass'
														label='Old Password'
														type='password'
														autoComplete='on'

													/>
												</Grid>
												<Grid item md={6} xs={12}>
													<TextInput
														data-testid="password"
														name="password"
														label="Password"
														type='password'
														autoComplete='on'

													/>
												</Grid>
												<Grid item md={6}
													xs={12}
													align='center'>
													<TextInput
														data-testid="confirmPass"
														name="confirmPass"
														label="Confirm Password"
														type='password'
														autoComplete='on'
													/>
												</Grid>

												<Grid item md={6} xs={12} sx={{ mt: 2 }} >
													<Typography
														fontSize={12}
														color={'primary.dark'}
														fontWeight={700}
													>
														Notification preferences
													</Typography>
													<Typography
														fontSize={12}
														color={'primary.light'}
														letterSpacing={'.3px'}
														maxWidth={'325px'}
													>
														Receive Postil promotions and news.
														If you do not want to receive notifications,
														uncheck box.
													</Typography>
													<CheckboxInput
														name='subscribe'
														label='E-mail'
													/>
												</Grid>

												<Grid item xs={12} sx={{ textAlign: 'center', mt: 2}}>

													<ButtonInput

													>
														Save Changes
													</ButtonInput>
												</Grid>

											</Grid>
										</Form>
									)
								}}

							</Formik>
						</Container>
					</Grid>
				</Grid>
			</Box>

		</Box>
	)
}

export default UserForm