let users = [
  { id: 1, name: "User 1" },
  { id: 2, name: " User 2"},
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" }
];



const express = require("express");

const app = express();

const port = 3001;

// GET

app.get("/data",(req,res)=>{
    res.json(users);
})

// GET specific 

app.get("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id == id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});


// post

app.post("/data", (req, res) => {
  const newUser = req.body;

  newUser.id = users.length + 1; 
  users.push(newUser);

  res.status(201).json({
    message: "User added",
    user: newUser
  });
});


//put


app.put("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateData = req.body;

  const index = users.findIndex(user => user.id == id);

  if (index == -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[index] = { ...users[index], ...updateData };

  res.json({
    message: "User updated",
    user: users[index]
  });
});


//delete

app.delete("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);

  users = users.filter(u => u.id !== id);

  res.json({
    message: "User deleted successfully",
  });
});


app.listen(port,(req,res)=>{
    console.log("server runningg");
})

