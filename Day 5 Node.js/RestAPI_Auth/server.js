import express from 'express';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config'

const app = express();
app.use(express.json());


const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Connection to Postgres has been established successfully.');

    
    await sequelize.sync({ alter: false });
    console.log(' Database tables synchronized.');

    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error(' Unable to connect to the database or sync tables:');
    console.error(err.message);
   
  }
};

startServer();