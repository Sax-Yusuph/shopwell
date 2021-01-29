import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import * as api from '../api'

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState({})

	useEffect(() => {
		const getProduct = async () => {
			const { data } = await api.fetchProduct(match.params.id)
			setProduct(data)
		}
		getProduct()
	}, [match.params.id])

	return (
		<>
			<Link className='btn-light btn my-3' to='/'>
				{' '}
				Go back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating
								value={product.value}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroup.Item>
						<ListGroup.Item>Price: ₦{product.price}</ListGroup.Item>
						<ListGroup.Item>Description: {product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>₦{product.price}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									className='btn-block'
									type='button'
									disabled={product.countInStock === 0}
								>
									Add to Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ProductScreen
