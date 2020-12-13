import React,{useState,useEffect} from 'react';
import {  FlatList, View } from 'react-native';
import {Header} from 'react-native-elements';
import {AuthContext} from '../providers/AuthProvider';
import { Ionicons} from '@expo/vector-icons';
// import { getDataJSON } from "./../functions/AsyncStorageFunctions";
import  ShowNotification  from "./../components/NotifactionShow";
import * as firebase from 'firebase';
import "firebase/firestore";

const  NotificationScreen =({navigation})=> {
    let [notification,setNotification]=useState([]);
    const [reload,setReload]=useState(false);

    const getNotification = async ()=>{
        setReload(true)
        firebase
        .firestore()
        .collection("notifications")
        .orderBy("createdAt","desc")
        .onSnapshot((querySnapshot)=>{
            let allNotify=[]
            querySnapshot.forEach((doc)=>{
                allNotify.push({
                    id:doc.id,
                    data:doc.data(),
                });
            });
            if(allNotify!=null){
                setNotification(allNotify)
            }
            else console.log("no Notification")
            setReload(false)
        },(error)=>{
            setReload(false);
            console.log(error);
        });
    }
    useEffect(()=>{
        getNotification();
    },[]);

    return(
        <AuthContext.Consumer>
            {(auth)=>
            (
                <View style={{flex:1}} >
                    <Header
                    containerStyle={{
                    backgroundColor: '#930077',
                    justifyContent: 'space-around',
                }}
                    leftComponent={<Ionicons name="md-menu" size={25} color="white" onPress={()=>{
                        navigation.openDrawer();
                    }}/>}
                    centerComponent={{ text: 'Notification', style: {fontSize:20, color: '#fff' } }}
                    rightComponent={<Ionicons name="md-lock" size={25} color="white" 
                    onPress={()=>{
                        firebase
                        .auth()
                        .signOut()
                        .then(()=>{
                            auth.setisLogged(false);
                            auth.setcurrentUser({});
                        }).catch((error)=>console.log(error))
                    }}/>}
                    />
                    <View>
                        <FlatList
                        data={notification}
                        onRefresh={getNotification}
                        refreshing={reload}
                        renderItem={function ({ item }) {
                            if(item.data.receiver==auth.currentUser.email)
                                return (
                                <ShowNotification
                                    content={item.data}
                                    navigation={navigation}
                                />);
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    
                    
                </View>
                
            )}
        </AuthContext.Consumer>
    );
}



export default NotificationScreen;