import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Order = sequelize.define('Order', {
  productName: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false }
});

export default Order;