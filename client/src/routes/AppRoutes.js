import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import Main from '../pages/Main/Main'
import ProductsList from '../pages/ProductsList/ProductsList'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Catalog from '../pages/Catalog/Catalog'
import PaymentAndDelivery from '../staticPages/PaymentAndDelivery/PaymentAndDelivery'
import Returns from '../staticPages/Returns/Returns'
import About from '../staticPages/About/About'
import PrivacyPolicy from '../staticPages/PrivacyPolicy/PrivacyPolicy'
import AboutUs from '../staticPages/AboutUs/AboutUs'
import Reviews from '../staticPages/Reviews/Reviews'
import Blog from '../staticPages/Blog/Blog'
import Login from '../pages/Login/Login'
import Cart from '../pages/Cart/Cart'
import Contact from '../staticPages/Contact/Contact'
import Page404 from '../pages/Page404/Page404'
import Favorites from '../pages/Favorites/Favorites'
import TermsOfService from '../staticPages/TermsOfService/TermsOfService'

const AppRoutes = () => {
	return (
		<Switch>
			<Route exact path='/'><Main /></Route>
			<Route exact path='/about'><About /></Route>
			<Route exact path='/login'><Login /></Route>
			<ProtectedRoute exact path='/favorites' isLoggedIn={false}>
				<Favorites />
			</ProtectedRoute>
			<Route exact path='/productslist'><ProductsList /></Route>
			<Route exact path='/productdetails'><ProductDetails /></Route>
			<Route exact path='/cart'><Cart /></Route>
			<Route exact path='/contact'><Contact /></Route>
			<Route exact path='/catalog'><Catalog /></Route>
			<Route exact path='/paymentanddelivery'><PaymentAndDelivery /></Route>
			<Route exact path='/returns'><Returns /></Route>
			<Route exact path='/privacypolicy'><PrivacyPolicy /></Route>
			<Route exact path='/aboutus'><AboutUs /></Route>
			<Route exact path='/reviews'><Reviews /></Route>
			<Route exact path='/blog'><Blog /></Route>
			<Route exact path='/termsofservice'><TermsOfService /></Route>
			<Route exact path='*'><Page404 /></Route>
		</Switch>
	)
}

export default AppRoutes