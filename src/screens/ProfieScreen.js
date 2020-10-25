import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View,StyleSheet,ImageBackground} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { Header} from 'react-native-elements';
import { FontAwesome,Ionicons,AntDesign,Feather } from '@expo/vector-icons';
import {removeData,clear} from './../functions/AsyncStorageFunctions';
import { Avatar,Button } from "react-native-elements";
import {
    Title,
    Caption,
    Text,
} from 'react-native-paper';


const ProfileScreen =()=>{
    return(
         <AuthContext.Consumer>
            {(auth)=>
            (
            <View style={styles.container}>
                <StatusBar style="light"/>
                <Header
                    containerStyle={{
                    backgroundColor: '#3D6DCC',
                    justifyContent: 'space-around',}}
                    leftComponent={<Ionicons name="md-menu" size={25} color="white" onPress={()=>{
                        navigation.openDrawer();
                    }}/>}
                    centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
                    rightComponent={<Ionicons name="md-lock" size={25} color="white" 
                    onPress={()=>{
                        auth.setisLogged(false);
                        auth.setcurrentUser({});
                    }}/>}
                    />
                
                    <ImageBackground 
                    source={{uri:'https://picsum.photos/800',}} 
                    style={{height:250,width:400}}>
                        <View style={{paddingHorizontal:140,paddingVertical:190}}>
                            <Avatar
                    rounded
                    size={120}
                    avatarStyle={{ borderWidth: 5, borderColor: 'white' }}
                    source={{
                        uri:'https://picsum.photos/200',
                    }}
                    />
                        </View>
                    </ImageBackground>
                    
                    <View style={{alignItems:'center',marginTop:65,marginBottom:10,marginLeft:10}}>
                    <Title style={styles.title}>{auth.currentUser.name}</Title>
                    <Caption style={styles.caption}>{auth.currentUser.email}</Caption>
                    </View>
                
                <View style={{
                    marginTop:20,
                    paddingHorizontal:30,
                    marginBottom:25,}}>   
                <View style={styles.row}>
                    <Feather name="map-pin" size={24} color="#777777" />
                    <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.location==null?"No value set yet":"Stays at "+auth.currentUser.location}</Text>
                </View>
                <View style={styles.row}>
                   <FontAwesome name="birthday-cake" size={24} color="#777777" />
                    <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.bday==null?"No value set yet":"Born on "+auth.currentUser.bday}</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome name="institution" size={24} color="#777777" />
                    <Text style={{marginLeft:20,color:"#777777"}}>{auth.currentUser.works==null?"No value set yet":"Works at "+auth.currentUser.works}</Text>
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
                        console.log("Settings")
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
                        let deleted=await removeData(auth.currentUser.email);
                        if(deleted){
                            alert("User Removed Successfully");
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
        marginBottom:10,
    },
    
});


export default ProfileScreen;