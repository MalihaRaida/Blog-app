import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View,StyleSheet} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { FontAwesome,AntDesign,Feather } from '@expo/vector-icons';


import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';

const ProfileScreen =()=>{
    return(
         <AuthContext.Consumer>
            {(auth)=>
            (
            <View style={styles.container}>
                <StatusBar style="Dark"/>
                <View style={[styles.userInfo,{flexDirection:"row"}]}>
                    <Avatar.Image
                    source={{
                        uri:'https://picsum.photos/200',
                    }}
                    size={80}
                    />
                    <View style={{marginTop:10,marginLeft:10}}>
                    <Title style={styles.title}>{auth.currentUser.name}</Title>
                    <Caption style={styles.caption}>{auth.currentUser.email}</Caption>
                    </View>
                </View>
                <View style={{
                    marginTop:20,
                    paddingHorizontal:30,
                    marginBottom:25,}}>   
                <View style={styles.row}>
                    <Feather name="map-pin" size={24} color="#777777" />
                    <Text style={{marginLeft:10,color:"#777777"}}>Uttara, Dhaka</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome name="institution" size={25} color="#777777" />
                <Text style={{marginLeft:10,color:"#777777"}}>Islamic University of Technology</Text>
                </View>
                <View style={styles.row}>
                    <AntDesign name="idcard" size={25} color="#777777" />
                    <Text style={{marginLeft:10,color:"#777777"}}>{auth.currentUser.id}</Text>
                </View>
                </View>
            </View>)}
        </AuthContext.Consumer>
        
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    userInfo:{
        marginTop:70,
        paddingHorizontal:30,
        marginBottom:25,
    },
    title:{
        fontSize:24,
        fontWeight:"bold"
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        fontWeight:'500',
    },
    row:{
        flexDirection:'row',
        marginBottom:10,
    }
});


export default ProfileScreen;