import express from 'express'


const app = express()



app.use((req, res, next) => {
  console.log("Request aayi");
  next();
});

app.get("/test", (req, res, next) => {
  res.send("Hello");
  next();
});

app.use((req, res) => {
  console.log("Response ja rahi hai");
});

app.use((req, res, next) => {
  console.log("prob run");
  next();
});



app.listen(3005,(req,res)=>{
    console.log("server is running ");

})