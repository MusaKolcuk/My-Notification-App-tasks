import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Notification from './models/notificationModel.js';

Product.hasMany(Order, { foreignKey: 'productId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(Notification, { foreignKey: 'orderId' });
Notification.belongsTo(Order, { foreignKey: 'orderId' })
