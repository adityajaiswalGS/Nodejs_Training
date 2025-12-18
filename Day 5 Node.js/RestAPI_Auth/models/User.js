import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  mobileNo: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false 
  },
     password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
}, {
hooks: {
  beforeCreate: async (user) => {
    try {
      console.log(" Hashing password...");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      console.log("Hash complete.");
    } catch (err) {
      console.error("Encryption Error:", err);
      throw err; 
    }
  }
}
});

export default User;