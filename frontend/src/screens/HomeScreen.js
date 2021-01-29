import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import * as api from '../api'

const HomeScreen = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const getProducts = async () => {
			const { data } = await api.fetchProducts()
			setProducts(data)
		}

		getProducts()
	}, [])
	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map(product => (
					<Col sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	)
}

export default HomeScreen
