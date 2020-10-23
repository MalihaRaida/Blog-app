import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import { Header} from 'react-native-elements';
import {AuthContext} from './../providers/AuthProvider';
import { Ionicons ,Entypo} from '@expo/vector-icons';
import { Card, Button ,Input} from 'react-native-elements'
import moment from 'moment';
import { storeDataJSON,getAllPost, getDataJSON, getAllKeys} from '../functions/AsyncStorageFunctions';


function ShowCurrentDate() {
      var date = new moment().format('DD MMM YYYY');
      return date;
}

const PostWrite=({user})=>{
    const [post, setPost] = useState("");
    const [likecount,setLikeCount]=useState(0);
    const input = React.createRef();
    return(
    <Card containerStyle={{borderRadius:10,shadowColor:'blue', shadowOffset:10}}>
        <Input
        ref={input}
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
                        date: ShowCurrentDate(),
                        likecount:likecount,
                    }
                    id=Math.floor((Math.random() * 100000) + 1);
                    console.log(newPost);
                    storeDataJSON("post"+id,newPost);
                    setPost("");
                    input.current.clear();
                }
            }/>
            <Button 
            disabled={post.length==0? true:false} 
            type='clear' title='Clear' 
            buttonStyle={{width:120,alignSelf:'flex-end'}}
            onPress={()=>{
                setPost("");
                input.current.clear();
            }}/>


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