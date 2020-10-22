import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Button } from 'react-native-elements';
import {AuthContext} from './../providers/AuthProvider';
const  HomeScreen =()=> {
    return(
        <AuthContext.Consumer>
            {(auth)=>
            (
                <View >
                    <StatusBar
                    hidden={true}
                    backgroundColor="blue"
                    barStyle="light-content"/>
                    <Text style={styles.TextStyle}>Hello from {auth.currentUser.name}</Text>
                    <Button
                    title="Log Out"
                    type="solid"
                    onPress={()=>{
                        auth.setisLogged(false);
                        auth.setcurrentUser({});
                    }}>
                    </Button>
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

export default HomeScreen;