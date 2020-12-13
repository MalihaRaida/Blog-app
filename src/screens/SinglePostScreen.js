import  React, { useEffect, useState } from "react";
import {StyleSheet, View,FlatList,Text } from "react-native";
import {AuthContext} from '../providers/AuthProvider';
import { Header,Avatar} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import {Card, CardItem, Button, Left, Body, Right} from 'native-base';
import WriteComment from '../components/CommentWrite';
import ShowComment from "./../components/CommentShow";

import * as firebase from "firebase";
import "firebase/firestore";

const SinglePostScreen=({navigation,route})=>{
    let postid=route.params.post
    let [postDetails,setpostDetails]=useState({});
    const [postComment,setComment]=useState([]);
    const [reload,setReload]=useState(false);

    const getPost=async()=>{
        firebase
        .firestore()
        .collection("posts")
        .doc(postid)
        .get()
        .then((doc)=>{
            let post=doc.data()
            post.id=postid
            post.createdAt=post.createdAt.toDate().toDateString()
            console.log(post)
            setpostDetails(post)
        })
        .catch((error)=>console.log(error));
    }

    const getComments=async()=>{
        firebase
        .firestore()
        .collection("notifications")
        .orderBy("createdAt","desc")
        .onSnapshot((querySnapshot)=>{
            let allComment=[]
            querySnapshot.forEach((doc)=>{
                allComment.push({
                    id:doc.id,
                    data:doc.data(),
                });
            });
            if(allComment!=null){
                let Comment=allComment.filter(c=>c.data.postid==postid && c.data.comment!=undefined)
                setComment(Comment)
            }
            else console.log("no comment")
            setReload(false)
        },(error)=>{
            setReload(false);
            console.log(error);
        });
    }

    // useEffect(()=>{
        
    // },[]);
    useEffect(()=>{
        getPost();
        getComments();
    },[]);

    return(
        <AuthContext.Consumer>
            {(auth)=>
            (
                <View style={styles.container}>
                    <StatusBar style="light"/>
                    <Header
                    containerStyle={{
                    backgroundColor: '#e61c5d',
                    justifyContent: 'space-around',}}
                    leftComponent={<Ionicons name="md-arrow-back" size={25} color="white" onPress={()=>{
                        navigation.navigate("Home");
                    }}/>}
                    centerComponent={{ text: 'Post', style: { fontSize:20,color: '#fff' } }}
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

                <Card style={{flex: 0,marginLeft:5,marginRight:5,marginTop:10,padding:10,borderRadius:10,shadowColor:'blue', shadowOffset:10,}}>
                    <CardItem header>
                        <Left>
                            <Avatar size='medium' rounded
                                overlayContainerStyle={{backgroundColor: 'grey'}}
                                icon={{name: 'user', type: 'font-awesome'}} />
                            <Body>
                            <Text style={{fontSize:15}}>{postDetails.user_name}</Text>
                            <Text style={{color:'grey'}}>{postDetails.createdAt}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{fontSize:15}}>{postDetails.post}</Text>
                        </Body>
                        
                    </CardItem>
                    <CardItem >
                        <Left style={{flex:1}}>
                            <Button transparent icon>
                                <Ionicons name="ios-heart" size={40} color="pink" />
                            </Button>
                            <Text>{postDetails.likecount}</Text>
                        </Left>
                        
                    </CardItem>
                    </Card>
                        <WriteComment user={auth.currentUser.displayName} post={postDetails}/>
                        <FlatList
                            data={postComment}
                            onRefresh={getComments}
                            refreshing={reload}
                            renderItem={({item}) =>{
                                return <ShowComment content={item.data} />
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                </View>
                )}
        </AuthContext.Consumer>
    );


};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});

export default SinglePostScreen;