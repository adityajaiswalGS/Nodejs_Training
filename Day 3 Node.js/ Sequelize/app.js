import express from 'express';
import sequelize from './database.js';
import User from './user.js';
import { generic_middleware } from './generic_middleware.js'; 
import passport from './passport-config.js';
import jwt from 'jsonwebtoken';


const app = express();
app.use(express.json()); 
const PORT = 3002;

app.use(generic_middleware);
app.use(passport.initialize());

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


app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user.id }, 'gammastack', { expiresIn: '1h' });

    res.json({ 
      message: " token generated ",
      token: token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/users", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const dbUsers = await User.findAll();
    res.json({
      message: "Data fetched successfully",
      requestedBy: req.user.name, 
      data: dbUsers
    });
  } catch (error) {
    res.status(500).json({ error: "Access Denied" });
  }
});



// app.get("/users", async (req, res) => {
//   try {
//     const dbUsers = await User.findAll(); 
//     res.json(dbUsers);
//   } catch (error) {
//     res.status(500).json({ error: "Could not fetch users" });
//   }
// });



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
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



async function start() {
  try {
    await sequelize.sync({ alter: true }); 
    console.log(" Database connected  ");
    app.listen(PORT, () => {
      console.log(`Server running: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(" Startup failed:", err);
  }
}

start();