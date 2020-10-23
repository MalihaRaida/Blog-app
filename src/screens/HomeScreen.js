import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import { Header} from 'react-native-elements';
import {AuthContext} from './../providers/AuthProvider';
import { Ionicons ,Entypo} from '@expo/vector-icons';
import { Card, Button ,Input} from 'react-native-elements'



const [post, setPost] = useState([]);
const [user, setUser] = useState([]);

function ShowCurrentDate() {

      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      return (date + '-' + month + '-' + year);
}

const PostWrite=({user})=>{
    return(
    <Card containerStyle={{borderRadius:10,shadowColor:'blue', shadowOffset:10}}>
        <Input
        placeholder='Write about the unknows'
        multiline={true}
        leftIcon={<Entypo name="pencil" size={24} color="black" />}
        onChangeText={(text)=>{
            setPost(text);
        }}
        />
        <View style={{flexDirection:'row-reverse'}}>
            <Button title='Post' buttonStyle={{width:100,alignSelf:'flex-start'}} onPress={
                ()=>{
                    let newPost={
                        post:post,
                        user:user.name,
                        date: ShowCurrentDate()
                    }
                    storeDataJSON(email,newPost);
                }
            }/>
            <Button disabled={true} type='clear' title='Clear' buttonStyle={{width:100,alignSelf:'flex-end'}}/>
        </View>
        
    </Card>
    );
    
};




const  HomeScreen =({navigation})=> {
    
    return(
        <AuthContext.Consumer>
            {(auth)=>
            (
                
                <View >
                    <StatusBar style="light"/>
                    <Header
                    containerStyle={{
                    backgroundColor: '#3D6DCC',
                    justifyContent: 'space-around',}}
                    leftComponent={<Ionicons name="md-menu" size={25} color="white" onPress={()=>{
                        navigation.openDrawer();
                    }}/>}
                    centerComponent={{ text: 'Home', style: { color: '#fff' } }}
                    rightComponent={<Ionicons name="md-lock" size={25} color="white" 
                    onPress={()=>{
                        auth.setisLogged(false);
                        auth.setcurrentUser({});
                    }}/>}
                    />
                    <Text style={styles.TextStyle}>Hello from {auth.currentUser.email}</Text>
                    <PostWrite user={auth.currentUser}/>
                    
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