import * as api from '../api'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/actionTypes'

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await api.fetchProduct(id)

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	})

	localStorage.setItem('cart_items', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = id => async (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: id })
	localStorage.setItem('cart_items', JSON.stringify(getState().cart.cartItems))
}
