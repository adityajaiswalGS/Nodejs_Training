import getService from "../service/getService.js";


const idforPost = 2;

const handledata = async ()=>{
    try{
        const allpost = await getService.getposts();
        console.log("here is all posts", allpost);

        const singlepost = await getService.getSinglePost(idforPost);
        console.log("here is the single post ", singlepost);
        
    }
    catch (error){
        console.error("Application Error "+ error)
    }
}

handledata();