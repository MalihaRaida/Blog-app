import { getAllKeys,getDataJSON } from "./AsyncStorageFunctions";


const getAllPosts=async()=>{
    let keys=await getAllKeys();
        let Allposts=[];
        if(keys!=null ){
            for (let key of keys) {
                if (key.startsWith('post')) {
                    let post=await getDataJSON(key);
                    Allposts.push(post);
                }
            }
            return Allposts;
        }
        else
            return null;
}


const getUserPost=async(user)=>{
    let Allposts=await getAllPosts();
    if(Allposts!=null){
        let userPost=Allposts.filter(p=>p.user_email==user)
        let userPostId=[]
        for(let post of userPost)
        {
            userPostId.push(post.id)
        }
        return userPostId;
    }else return null
}

export  {getAllPosts,getUserPost};