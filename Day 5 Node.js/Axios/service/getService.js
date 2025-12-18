import apiClient from "../api/apiclient_url.js";

const getService = {

    getposts : ()=>{
        return apiClient.get('/posts');
    },
    getSinglePost : (id)=> {
        return apiClient.get(`/posts/${id}`)
    }
}

export default getService;