import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet ,View,FlatList ,Button} from 'react-native';
import { Header} from 'react-native-elements';
import {AuthContext} from './../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import PostWrite from './../components/PostWrite';
import ShowPost from './../components/PostShow';
import * as firebase from "firebase";
import {getAllPosts} from '../functions/PostFunction';


const  HomeScreen =({navigation})=> {
    const [posts,setPosts]=useState([]);
    const [reload,setReload]=useState(false)
    const getPosts = async ()=>{
        setReload(true)
        let Allposts= await getAllPosts();
        if(posts!=null)
        {
            setPosts(Allposts)
        }
        else console.log("no Posts")
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
                    backgroundColor: '#3a0088',
                    justifyContent: 'space-around',}}
                    leftComponent={<Ionicons name="md-menu" size={25} color="white" onPress={()=>{
                        navigation.openDrawer();
                    }}/>}
                    centerComponent={{ text: 'Home', style: { fontSize:20,color: '#fff' } }}
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
                    
                        <PostWrite user={auth.currentUser} />
                        <FlatList
                        data={posts}
                        onRefresh={getPosts}
                        refreshing={reload}
                        renderItem={function ({ item }) {
                            return (
                            <ShowPost
                                content={item}
                                currentuser={auth.currentUser}
                                navigation={navigation}
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
    container:{
        flex:1,
        justifyContent: "center",
        
    },
});

export default HomeScreen;