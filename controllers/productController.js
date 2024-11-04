import Product from '../models/productModel.js';

// Create new product
export const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        const newProduct = await Product.create({ name, price });

        return res.status(201).json({ newProduct });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        return res.status(200).json({ products });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const { name, price } = req.body;

        const [updatedRowsCount, updatedRows] = await Product.update(
            { name, price },
            { where: { id: productId }, returning: true }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ updatedProduct: updatedRows[0] });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const deletedRowsCount = await Product.destroy({ where: { id: productId } });

        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};
