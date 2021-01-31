import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products.js'
import users from './data/users.js'
import Product from './models/product.js'
import User from './models/user.js'
import Order from './models/order.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await User.deleteMany()
		await Product.deleteMany()
		await Order.deleteMany()

		const createdUsers = await User.insertMany(users)
		const adminUser = createdUsers[0]._id

		const sampleProducts = products.map(product => ({
			...product,
			user: adminUser,
		}))
		await Product.insertMany(sampleProducts)
		console.log('Data Imported!'.green.inverse)
		process.exit()
	} catch (err) {
		console.error(`${err}`.red.inverse)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await users.deleteMany()
		await Products.deleteMany()
		await Orders.deleteMany()

		console.log('Data Destroyed!'.red.inverse)
		process.exit()
	} catch (err) {
		console.error(`${err}`.red.inverse)
		process.exit(1)
	}
}

if (process.argv[2] === ('-d' || '--destroy')) {
	destroyData()
} else {
	importData()
}
