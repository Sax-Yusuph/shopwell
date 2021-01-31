import asyncHandler from 'express-async-handler'
import { Router } from 'express'
import { getProducts, getProduct } from '../controllers/product.js'

const router = Router()

// @ Desc   Get all Products
// @Route   /api/products
// @access  everybody
router.get('/', asyncHandler(getProducts))
// @ Desc   Get a single Product
// @Route   /api/product/:id
// @access  everybody
router.get('/:id', asyncHandler(getProduct))

export default router
