import React from 'react'
import {Box, Button, Card, CardMedia, Grid, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
	popularHeader:{
		textTransform: 'uppercase' ,
		letterSpacing : '10px',
		color:'#373F41',
	}
})

const PopularCard = ({data}) => {
	const classes = useStyles()
	return (
		<Grid item md={data.grid} >
			<Card sx={{border: 'none', boxShadow: 'none', borderRadius:'2px' }} >
				<Box sx={{ position: 'relative' }}>
					<CardMedia
						height={'342px'}
						component={'img'}
						image={data.image}/>
					<Box
						sx={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							width: '100%',
							backgroundColor: 'rgba(255, 255, 255, 0.6);',
							padding: '10px',
						}}>
						<Box textAlign={'end'} sx={{mr:'45px'}}>
							<Typography fontSize={25} align={'right'} variant="h2"
								sx={{mt:'15px', mb:'15px'}} className={classes.popularHeader}>
								{data.title}
							</Typography>
							<Button
								color={'primary'}
								sx={{paddingY:'10px' , paddingX:'40px', mb:'15px'}}
								variant={'outlined'}>
								Shop
							</Button>
						</Box>
					</Box>
				</Box>
			</Card>
		</Grid>
	)
}

PopularCard.propTypes ={
	data : PropTypes.shape({
		title: PropTypes.string,
		image: PropTypes.string,
		grid:PropTypes.number
	})
}

export default PopularCard