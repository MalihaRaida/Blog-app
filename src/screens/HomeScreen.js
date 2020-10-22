import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button } from 'react-native-elements';
import {AuthContext} from './../providers/AuthProvider';
const  HomeScreen =()=> {
    return(
        <AuthContext.Consumer>
            {(auth)=>
            (
                <View>
                    <Text style={styles.TextStyle}>Hello from HomeScreen</Text>
                    <Button
                    title="Log Out"
                    type="solid"
                    onPress={()=>{
                        auth.setisLogged(false);
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
});

export default HomeScreen;