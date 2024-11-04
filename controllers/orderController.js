import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;

        if (!products || !products[0] || !products[0].id) {
            return res.status(400).json({ message: "Ürün ID'si gereklidir." });
        }

        const productId = products[0].id;

        const newOrder = await Order.create({
            userId: userId || null,
            productId,
            orderTime: new Date(),
        });

        const product = await Product.findByPk(productId);
        const user = userId ? await User.findByPk(userId) : null;
        const userName = user ? `${user.fullname}` : "Anonim";
        const notificationMessage = `Yeni sipariş: ${product.name} ürünü, kullanıcı ${userName} tarafından sipariş edildi.`;

        await Notification.create({ message: notificationMessage, orderId: newOrder.id });

        return res.status(201).json({ message: "Sipariş başarıyla oluşturuldu", newOrder });
    } catch (error) {
        console.error("Hata:", error.message);
        return res.status(400).json({ message: error.message });
    }
};


// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        return res.status(200).json({ orders });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Get a single order by orderId
export const getOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json({ order });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Update an order
export const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { userId, productId } = req.body;
    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.userId = userId !== undefined ? userId : order.userId;
        order.productId = productId !== undefined ? productId : order.productId;
        await order.save();
        return res.status(200).json({ order });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};

// Get notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            include: [
                {
                    model: Order,
                    include: [{ model: Product }],
                },
            ],
        });
        return res.status(200).json({ notifications });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ message: error.message });
    }
};
