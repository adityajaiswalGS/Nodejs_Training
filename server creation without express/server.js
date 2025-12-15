// const http = require('http');
// const fs = require('fs')

// const myserver = http.createServer((req,res)=>{
//     const log = `${Date.now()} : someone visited server \n`;

//     fs.appendFile("log.txt",log,(err,data)=>{
//         res.end("helloo from server")
//     });
// });
// myserver.listen(3003,()=>{console.log("Successfully Runningg");
// })


let users = [
  { id: 1, name: "User 1" },
  { id: 2, name: " User 2"},
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" }
];



const http = require('http')
const myserver = http.createServer((req,res)=>{

    const {url , method } = req;

        // res.end(console.log(req);
    // res.end(console.log(url , method));



  //  Get ALL users
if (url === "/data" && method == "GET") {
  return res.end(JSON.stringify(users));
}

if (url.startsWith("/data/") && method == "GET") {

  const id = parseInt(url.split("/")[2]);

  const user = users.find(u => u.id === id);

  if (!user) {
    res.statusCode = 404;
    return res.end("User not found");
  }

 
  return res.end(JSON.stringify(user));
}

        // PUT 

  if (url.startsWith("/data/") && method == "PUT") {

    console.log("hi")
    const id = parseInt(url.split("/")[2]);

    const user = users.find((u) => u.id == id);

    if (!user) {
      res.statusCode = 404;
      return res.end("User not found");
    }

    let body = "";

    req.on("data", (chunk) => {
        console.log({chunk})
      body += chunk;
    });

    req.on("end", () => {
      const updatedInfo = JSON.parse(body);
        
      user.name = updatedInfo.name;

      res.end("User updated: " + JSON.stringify(user));
    });

    return;
  }


//       DELETE

if (url.startsWith("/data/") && method === "DELETE") {

  const id = parseInt(url.split("/")[2]);

  const userIndex = users.findIndex((u) => u.id == id);

  if (userIndex == -1) {
    res.statusCode = 404;
    return res.end("User not found");
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.end("Deleted user: " + JSON.stringify(deletedUser));

  return;
}


});
myserver.listen(3004,()=>{console.log("server started");
})