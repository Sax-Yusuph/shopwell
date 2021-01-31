import Product from '../models/product.js'

// @ Desc   Get all Products
export const getProducts = async (req, res) => {
	const products = await Product.find()

	res.json(products)
}

// @ Desc   Get a single Product
export const getProduct = async (req, res) => {
	const products = await Product.findById(req.params.id)
	if (products) {
		res.json(products)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
}
