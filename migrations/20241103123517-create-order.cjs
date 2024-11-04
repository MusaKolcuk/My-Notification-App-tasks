import { DataTypes } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('orders', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    }
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable('orders');
};
