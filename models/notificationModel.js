import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Order from './orderModel.js';

const Notification = sequelize.define('Notification', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'notifications',
    timestamps: true,
});

Notification.belongsTo(Order, { foreignKey: 'orderId' });

export default Notification;
