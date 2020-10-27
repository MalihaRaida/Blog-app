import {getDataJSON,storeDataJSON} from './AsyncStorageFunctions';

const AddNotification = async(value)=>{
    let notifies=[];
    try{
        let storedNotification=await getDataJSON('notification');
        if(storedNotification!=null){
            notifies.push(storedNotification)
            notifies.push(value)
            await storeDataJSON('notification',notifies);
        }
        else{
            notifies.push(value)
            await storeDataJSON('notification',notifies);
        }
    }catch(error){
        console.log(error)
    }
};


export default AddNotification;