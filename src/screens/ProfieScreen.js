import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {View,StyleSheet,ImageBackground} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { Header} from 'react-native-elements';
import { FontAwesome,Ionicons,AntDesign,Feather } from '@expo/vector-icons';
import { Avatar,Button } from "react-native-elements";
import {
    Title,
    Caption,
    Text,
} from 'react-native-paper';
import * as firebase from 'firebase';
import "firebase/firestore";

const ProfileScreen =({route,navigation})=>{
    let [userDetails,setUserDetails]=useState({})
    const getDetails= ()=>{
         firebase
        .firestore()
        .collection("users")
        .doc(route.params.user)
        .onSnapshot((doc)=>{
            setUserDetails(doc.data())
        },(error)=>console.log(error))
    }

    useEffect(()=>{
        getDetails()
    },[]);


    return(
         <AuthContext.Consumer>
            {(auth)=>
            (
            <View style={styles.container}>
                <StatusBar style="light"/>
                <Header
                    containerStyle={{
                    backgroundColor: '#14274e',
                    justifyContent: 'space-around',}}
                    leftComponent={<Ionicons name="md-menu" size={25} color="white" onPress={()=>{
                        navigation.openDrawer();
                    }}/>}
                    centerComponent={{ text: 'Profile', style: {fontSize:20, color: 'white' } }}
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
                
                    <ImageBackground 
                    source={{uri:'https://picsum.photos/id/1040/4496/3000',}} 
                    style={{height:200,width:400}}>
                        <View style={{paddingHorizontal:140,paddingVertical:140}}>
                            <Avatar
                    rounded
                    size={120}
                    avatarStyle={{ borderWidth: 5, borderColor: 'white' }}
                    source={{
                        uri:'https://picsum.photos/id/473/5616/3744',
                    }}
                    />
                        </View>
                    </ImageBackground>
                    
                    <View style={{alignItems:'center',marginTop:65,marginLeft:10}}>
                    <Title style={styles.title}>{auth.currentUser.displayName}</Title>
                    <Caption style={styles.caption}>{auth.currentUser.email}</Caption>
                    </View>
                
                <View style={{
                    marginTop:15,
                    marginBottom:15,}}>   
                    <View style={styles.row}>
                        <Feather name="map-pin" size={24} color="#777777" />
                        <Text style={{marginLeft:20,color:"#777777"}}>
                            {userDetails.location==undefined?"No value set yet":"Stays at "+userDetails.location}</Text>
                    </View>
                    <View style={styles.row}>
                    <FontAwesome name="birthday-cake" size={24} color="#777777" />
                        <Text style={{marginLeft:20,color:"#777777"}}>{userDetails.bday==undefined?"No value set yet":"Born on "+userDetails.bday}</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome name="institution" size={24} color="#777777" />
                        <Text style={{marginLeft:20,color:"#777777"}}>{userDetails.works==undefined?"No value set yet":"Works at "+userDetails.works}</Text>
                    </View>
                    <View style={styles.row}>
                        <AntDesign name="idcard" size={25} color="#777777" />
                        <Text style={{marginLeft:20,color:"#777777"}}>{userDetails.sid}</Text>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <Button
                    icon={<Ionicons name="md-settings" size={24} color="#ffffff" />}
                    containerStyle={{width:150,marginLeft:20,marginRight:20}}
                    titleStyle={{marginLeft:5}}
                    title="Settings"
                    
                    onPress={()=>{
                        navigation.navigate("SettingsScreen",{user:auth.currentUser.uid})
                    }}
                    />
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
        marginTop:20,
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
        marginBottom:15,
        backgroundColor:'white',
        padding:10,
        borderRadius:10,
        marginHorizontal:10,
        shadowOpacity:50,
        elevation:10
    },
    
});


export default ProfileScreen;