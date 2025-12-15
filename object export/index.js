import { user } from "./data.js";

user.forEach(e => {
    console.log(e.name);
    
})

user.map(e=>{
    console.log(e.address);
    
})

for (const temp of user){
    console.log(temp.year);
}