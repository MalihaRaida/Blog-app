import React,{useState,useEffect, Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet ,View,FlatList ,Button} from 'react-native';
import { Header} from 'react-native-elements';
import {AuthContext} from './../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import PostWrite from './../components/PostWrite';
import ShowPost from './../components/PostShow';
import { useIsFocused } from '@react-navigation/native';


import {  getDataJSON, getAllKeys} from '../functions/AsyncStorageFunctions';


const  HomeScreen =({navigation})=> {
    const [posts,setPosts]=useState([]);
    //const [newAdded,setNewAdded]=useState(null);
    const [relaod,setReload]=useState(false)

    const getPosts = async ()=>{
        setReload(true)
        let keys=await getAllKeys();
        let Allposts=[];
        if(keys!=null ){
            for (let key of keys) {
                if (key.startsWith('post')) {
                    let post=await getDataJSON(key);
                    Allposts.push(post);
                }
            }
            setPosts(Allposts);
        }
        else
            console.log("no keys");
        setReload(false);
    }

    useEffect(()=>{
        getPosts();
    },[]);
    

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
                    centerComponent={{ text: 'Home', style: { color: '#fff' } }}
                    rightComponent={<Ionicons name="md-lock" size={25} color="white" 
                    onPress={()=>{
                        auth.setisLogged(false);
                        auth.setcurrentUser({});
                    }}/>}
                    />
                    
                        <PostWrite user={auth.currentUser} />
                        <FlatList
                        data={posts}
                        onRefresh={getPosts}
                        refreshing={relaod}
                        renderItem={function ({ item }) {
                            return (
                            <ShowPost
                                writer={item.user}
                                date={item.date}
                                post={item.post}
                                likes={item.likecount}
                            />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        
                        />
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