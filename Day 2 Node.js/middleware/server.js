import express from 'express'
import { oauthMiddleware } from './middleware_oauth.js';
import { basicAuth } from './middleware_base.js';


let users = [
  { id: 1, name: "User 9" },
  { id: 2, name: " User 2"},
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" }
];


const app = express();
const PORT = 3002;

app.use((req,res,next)=>{
    console.log("hello from middleware 2");
    // res.json("END")
    console.log(req.ip);
    
    next();
})

app.use((req,res,next)=>{
    console.log("hello from middleware 1");
    next();
})




app.get("/data", oauthMiddleware,basicAuth , (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});


// app.get("/data", basicAuth, (req, res) => {
//   res.json({
//     message: "Basic Auth success",
//     user: req.user
//   });
// });

// app.get("/data",(req,res)=>{
//     res.json(users);
//     res.send("user getting successful");
// })


app.listen(PORT,(req,res)=>{
    console.log("server is running");
})