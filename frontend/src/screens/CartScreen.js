import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeItemFromCart } from '../actions/cartActions'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

import { Row, Col, ListGroup, Image, Button, Form, Card } from 'react-bootstrap'

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id
	const qty = location.search ? Number(location.search.split('=')[1]) : 1
	const dispatch = useDispatch()

	const { cartItems } = useSelector(state => state.cart)

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCart = id => {
		dispatch(removeItemFromCart(id))
	}

	const checkOutHandler = () => {
		history.push('/login?redirect=shipping')
	}
	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map(item => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>₦{item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={e =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{Array(item.countInStock)
												.fill(' ')
												.map((_, i) => (
													<option key={i + 1} value={i + 1}>
														{i + 1}
													</option>
												))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCart(item.product)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}){' '}
							</h2>
							₦
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								disabled={cartItems.length === 0}
								type='button'
								className='btn-block'
								onClick={checkOutHandler}
							>
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}
export default CartScreen
