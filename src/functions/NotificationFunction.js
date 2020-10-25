import {getDataJSON,storeDataJSON} from './AsyncStorageFunctions';

const AddLikeNotification=async(value)=>{
    let notifies=[];
    try{
        let storedNotification=await getDataJSON('like');
        if(storedNotification!=null){
            notifies.push(storedNotification)
            notifies.push(value)
            console.log(notifies)
            await storeDataJSON('like',notifies);
        }
        else{
            notifies=value;
            await storeDataJSON('like',notifies);
            console.log(notifies)
        }
    }catch(error){
        console.log(error)
    }
};

const AddCommentNotification=async(value)=>{
    let notifies=[];
    try{
        let storedNotification=await getDataJSON('comment');
        if(storedNotification!=null){
            notifies=storedNotification
            notifies.push(value)
            await storeDataJSON('comment',notifies);
        }
    }catch(error){
        console.log(error)
    }
};


export  {AddLikeNotification,AddCommentNotification};