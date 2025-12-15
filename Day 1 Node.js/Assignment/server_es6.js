import express from "express";

const users = [
  { name: "shubham", city: "Indore", education: "BE" },
  { name: "GS", city: "Ujjain", education: "BE1" },
  { name: "IT Park", city: "Ujjain", education: "BE2" },
  { name: "Aman", city: "Dewas", education: "BE3" }
];


const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  users.push(req.body);
  res.json({ message: "User added successfully" });
});

// server
app.listen(3002, () => {
  console.log("Server running on port 3002");
});
