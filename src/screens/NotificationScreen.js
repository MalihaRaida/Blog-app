import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header} from 'react-native-elements';
import {AuthContext} from '../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';


const  NotificationScreen =({navigation})=> {
    return(
        <AuthContext.Consumer>
            {(auth)=>
            (
                <View >
                    <Header
                    containerStyle={{
                    backgroundColor: '#694fad',
                    justifyContent: 'space-around',
                }}
                    leftComponent={<Ionicons name="md-menu" size={25} color="white" onPress={()=>{
                        navigation.openDrawer();
                    }}/>}
                    centerComponent={{ text: 'Notification', style: { color: '#fff' } }}
                    rightComponent={<Ionicons name="md-lock" size={25} color="white" 
                    onPress={()=>{
                        auth.setisLogged(false);
                        auth.setcurrentUser({});
                    }}/>}
                    />
                    <Text style={styles.TextStyle}>Hello from {auth.currentUser.name}</Text>
                    
                </View>
                
            )}
        </AuthContext.Consumer>
    );
}

const styles=StyleSheet.create({
    TextStyle:{
        fontSize:30,
        color:'blue',
    },
    container:{
        flex:1,
        justifyContent: "center",
        
    },
});

export default NotificationScreen;