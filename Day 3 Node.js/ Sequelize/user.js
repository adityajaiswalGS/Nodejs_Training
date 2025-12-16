import { DataTypes } from 'sequelize';
import sequelize from './database.js'; 

const User = sequelize.define('Users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true 
  }
});

export default User;