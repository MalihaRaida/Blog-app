import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View,StyleSheet,ImageBackground} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { Header} from 'react-native-elements';
import { FontAwesome,Ionicons,AntDesign,Feather } from '@expo/vector-icons';
import {clear, removeData} from './../functions/AsyncStorageFunctions';
import { Avatar,Button } from "react-native-elements";
import {
    Title,
    Caption,
    Text,
} from 'react-native-paper';

import {getUserPost} from './../functions/PostFunction';


const ProfileScreen =({navigation})=>{

    const deleteUserProfile=async(email)=>{
        let deleted=false;
        let postId=await getUserPost(email)
        for(let id of postId){
            deleted=await removeData(id);
        }
        deleted=await removeData(email);
        return deleted;
    }

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
                        auth.setisLogged(false);
                        auth.setcurrentUser({});
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
                    <Title style={styles.title}>{auth.currentUser.name}</Title>
                    <Caption style={styles.caption}>{auth.currentUser.email}</Caption>
                    </View>
                
                <View style={{
                    marginTop:15,
                    marginBottom:15,}}>   
                    <View style={styles.row}>
                        <Feather name="map-pin" size={24} color="#777777" />
                        <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.location==null||auth.currentUser.location==""?"No value set yet":"Stays at "+auth.currentUser.location}</Text>
                    </View>
                    <View style={styles.row}>
                    <FontAwesome name="birthday-cake" size={24} color="#777777" />
                        <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.bday==null||auth.currentUser.bday==""?"No value set yet":"Born on "+auth.currentUser.bday}</Text>
                    </View>
                    <View style={styles.row}>
                        <FontAwesome name="institution" size={24} color="#777777" />
                        <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.works==null||auth.currentUser.works==""?"No value set yet":"Works at "+auth.currentUser.works}</Text>
                    </View>
                    <View style={styles.row}>
                        <AntDesign name="idcard" size={25} color="#777777" />
                        <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.id}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Button
                    icon={<Ionicons name="md-settings" size={24} color="#0388fc" />}
                    containerStyle={{width:150,marginLeft:20,marginRight:20}}
                    titleStyle={{marginLeft:5}}
                    title="Settings"
                    type='outline'
                    onPress={()=>{
                        navigation.push("Settings")
                    }}
                    />
                    <Button
                    icon={<AntDesign name="deleteuser" size={24} color="white" />}
                    buttonStyle={{backgroundColor:'#e02f2f'}}
                    containerStyle={{width:150,marginLeft:30,marginRight:10,}}
                    titleStyle={{marginLeft:5}}
                    title="Delete"
                    type='solid'
                    onPress={async ()=>{
                        let deleted=await deleteUserProfile(auth.currentUser.email);
                        if(deleted){
                            alert("User Removed Successfully");
                            auth.setisLogged(false);
                            auth.setcurrentUser({});
                        }
                        else{
                            alert("Delete action unsuccessful");
                        }
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