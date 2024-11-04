import Notification from '../models/notificationModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

//Get all notifications
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            include: [
                {
                    model: Order,
                    include: [
                        { model: Product, attributes: ['name'] },
                        { model: User, attributes: ['fullname'] },
                    ],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

