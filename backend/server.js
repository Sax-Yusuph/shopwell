import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.get('/', (req, res) => {
	res.send('API is running')
})

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/products/:id', (req, res) => {
	const product = products.find(p => p._id === req.params.id)
	res.json(product)
})

mongoose
	.connect(process.env.MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(con => {
		console.log(
			`MongoDB connected: ${con.connection.host}`.black.bgGreen.underline
		)
		app.listen(PORT, () => {
			console.log(
				`server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
			)
		})
	})
	.catch(err => {
		console.log(`Error: ${err.message}`.red.underline.bold)
	})
