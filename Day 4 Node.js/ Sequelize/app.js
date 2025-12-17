import express from 'express';
import sequelize from './database.js';
import User from './models/user.js';
import Order from './models/order.js'; 
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 

const app = express();
app.use(express.json()); 

User.hasMany(Order, { foreignKey: 'userId', as: 'orders', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

//app.use(generic_middleware);
//app.use(passport.initialize());

app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email
    });
    res.status(201).json({ message: "User created!", data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/orders", async (req, res) => {
    try {
        const { productName, price, userId } = req.body;
        const newOrder = await Order.create({ productName, price, userId });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/users/:id/orders", async (req, res) => {
  try {
    const userId = req.params.id;

    const userDataWithOrders = await User.findByPk(userId, {
      include: [{
        model: Order,
        as: 'orders' 
      }]
    });

    if (!userDataWithOrders) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      userName: userDataWithOrders.name,
      orders: userDataWithOrders.orders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/orders/:id", async (req, res) => {
    try {
        const orderData = await Order.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'user', 
                attributes: ['id', 'name', 'email']
            }]
        });
        if(!orderData) return res.status(404).send("Order not found");
        res.json(orderData);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


app.get("/orders", async (req, res) => {
    try {
        const allOrders = await Order.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }]
        });
        res.json(allOrders); // Ye saare orders ki array dega
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      message: " token generated ",
      token: token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// app.get("/users", passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const dbUsers = await User.findAll();
//     res.json({
//       message: "Data fetched successfully",
//       requestedBy: req.user.name, 
//       data: dbUsers
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Access Denied" });
//   }
// });



app.get("/users", async (req, res) => {
  try {
    const dbUsers = await User.findAll(); 
    res.json(dbUsers);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch users" });
  }
});



app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      await user.save(); 
      res.json({ message: "User updated successfully", data: user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ message: "User and associated orders deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


async function start() {
  try {
    await sequelize.sync({ alter: true }); 
    console.log(" Database connected  ");
    app.listen(process.env.PORT, () => {
      console.log(`Server running: http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error(" Startup failed:", err);
  }
  // process.exit(0);
  // return;
}

start();