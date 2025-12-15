let users = [
  { name: "shubham", city: "Indore", education: "BE" },
  { name: "GS", city: "Ujjain", education: "BE1" },
  { name: "IT Park", city: "Ujjain", education: "BE2" },
  { name: "Aman", city: "Dewas", education: "BE3" }
];

const express = require("express");
const app = express();

app.use(express.json());


// get 
app.get("/users", (req, res) => {
  res.json(users);
});



//post wali 
     app.post("/users", (req, res) => {
  users.push(req.body);
  res.json({ message: "User added successfully"});
});


app.listen(3002, () => {
  console.log("server running");
});
