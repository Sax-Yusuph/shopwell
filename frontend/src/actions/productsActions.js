import {
	PRODUCTS_LIST_SUCCESS,
	PRODUCTS_LIST_FAIL,
	PRODUCTS_LIST_REQUEST,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from '../constants/actionTypes'

import * as api from '../api'

export const listProducts = () => async dispatch => {
	try {
		dispatch({ type: PRODUCTS_LIST_REQUEST })

		const { data } = await api.fetchProducts()

		dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCTS_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listProductDetails = id => async dispatch => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST })

		const { data } = await api.fetchProduct(id)

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
