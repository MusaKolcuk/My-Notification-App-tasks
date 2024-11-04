import express from 'express';
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Create new product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProducts);

// Update product
router.put('/update/:productId', updateProduct);

// Delete product
router.delete('/delete/:productId', deleteProduct);

export default router;
