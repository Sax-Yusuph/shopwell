import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoute.js'
import { errorHandler, notFound } from './middleware/error.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())

app.get('/', (req, res) => {
	res.send('API is running')
})

app.use('/api/products', productRoutes)

// middleware for incorect routes
app.use(notFound)

// error handler
app.use(errorHandler)

connectDB()
app.listen(PORT, () => {
	console.log(
		`server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
})
