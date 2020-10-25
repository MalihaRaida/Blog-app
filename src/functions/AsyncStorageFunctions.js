import {AsyncStorage} from 'react-native';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    alert("Data Stored Successfully!");
  } catch (error) {
    alert(error);
  }
};


const storeDataJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    alert("Data Stored Successfully!");
  } catch (error) {
    alert(error);
  }
};

const getAllKeys = async()=>{
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch(e) {
     console.log(e)
  }
}


const mergeData=async(key,value)=>{
  try{
    await AsyncStorage.mergeItem(key,value);
    return true;
  }catch(e){console.log(e)}
};

const clear =async()=>{
  AsyncStorage.clear();
};


const getAllData = () =>{
  AsyncStorage.getAllKeys().then((keys) => {
    return AsyncStorage.multiGet(keys)
      .then((result) => {
        // console.log(result);
      }).catch((e) =>{
        console.log(e);
      });
  });
}

  

const getData = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      return data;
    } else {
      alert("No data with this key!");
    }
  } catch (error) {
    alert(error);
  }
};

const getDataJSON = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      const jsonData = JSON.parse(data);
      return jsonData;
    } else {
      return null;
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    alert(error);
  }
};



export { mergeData,clear,getAllData,getAllKeys,storeData, storeDataJSON, getData, getDataJSON, removeData };