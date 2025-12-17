import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, 
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectDB(); 

export default sequelize;