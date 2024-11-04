import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    orderTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'orders',
    timestamps: false,
});

export default Order;
