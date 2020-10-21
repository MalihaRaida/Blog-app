import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const  HomeScreen =()=> {
    return(<Text style={styles.TextStyle}>Hello from HomeScreen</Text>);
}

const styles=StyleSheet.create({
    TextStyle:{
        fontSize:30,
        color:'blue',
    },
});

export default HomeScreen;