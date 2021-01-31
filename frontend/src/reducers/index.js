import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import { productDetailsReducer, productListReducer } from './productsReducers'

export const reducer = combineReducers({
	productsList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
})
