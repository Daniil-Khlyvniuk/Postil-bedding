import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, Alert } from '@mui/material'
import { SUBSCRIBE_SCHEMA } from '../setting/Schemes'
import TextInput from '../setting/customElements/TextInput'
import {snackActions} from '../../../utils/customHooks/useSnackBarUtils'
import { addSubscribe } from '../../../utils/API/subscribersAPI'
import { styled } from '@mui/material/styles'

const StyledForm = styled(Form)(() => ({
	display: 'flex',
	width: '100%',
}))

const StyledAlert = styled(Alert)(() => ({
	width: '100%',
}))

const SubscribeForm = () => {
	const [subscribeStatus, setSubscribeStatus] = useState(null)
	const handleSubmit = async ({ email }, formikFunctions) => {
		try {
			const res = await addSubscribe(email)
			if (res.status === 200) {
				setSubscribeStatus({ success: 'You successfully subscribed!' })
				snackActions.success('You successfully subscribed')
			}
		}
		catch (er) {
			setSubscribeStatus({ error: er.response.data.message })
			snackActions.warning(er.response.data.message)
		}
		formikFunctions.resetForm()
		setTimeout(() => setSubscribeStatus(null), 5000)
	}

	return (
		<Formik
			initialValues={{ email: '' }}
			validationSchema={SUBSCRIBE_SCHEMA}
			onSubmit={handleSubmit}
		>
			{(formikProps) => (
				<>
					<StyledForm noValidate>
						<Field
							data-testid="email"
							component={TextInput}
							type="email"
							placeholder="e-mail"
							name="email"
							onBlur={formikProps.handleBlur}
							onChange={formikProps.handleChange}
							error={true}
							asyncborderradius={'on'}
							fullWidth={true}
						/>

						<Button
							data-testid="button"
							type='submit'
							variant="contained"
							disabled={
								!formikProps.isValid ||
								formikProps.isSubmitting
							}
							asyncborderradius={'on'}
							sx={{
								paddingLeft: '40px',
								paddingRight: '40px',
							}}
						>
							send
						</Button>
					</StyledForm>

					{!formikProps.isValid && (
						<StyledAlert
							severity="error"
							icon={false}
						>
							{formikProps.errors.email}
						</StyledAlert>
					)}
					{subscribeStatus && subscribeStatus['success'] && (
						<StyledAlert
							icon={false}
							severity="success"
						>
							{subscribeStatus.success}
						</StyledAlert>
					)}
					{subscribeStatus && subscribeStatus['error'] && (
						<StyledAlert
							icon={false}
							severity="success"
						>
							{subscribeStatus.error}
						</StyledAlert>
					)}
				</>
			)}
		</Formik>
	)
}

export default SubscribeForm
