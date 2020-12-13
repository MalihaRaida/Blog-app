import React,{useState} from 'react';
import {Card,CardItem, Left, Body, Right} from 'native-base';
import {Avatar,Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {Text} from 'react-native';
import * as firebase from "firebase";
import "firebase/firestore";


const ShowPost=({content,currentuser,navigation})=>{
    const like=content.data.likecount
    const date=content.data.createdAt.toDate().toDateString()
    return(<Card style={{flex: 0,marginLeft:5,marginRight:5,marginTop:10,padding:10,borderRadius:10,shadowColor:'blue', shadowOffset:10,}}>
            <CardItem>
              <Left>
                    <Avatar size='medium' rounded
                    overlayContainerStyle={{backgroundColor: 'grey'}}
                    icon={{name: 'user', type: 'font-awesome'}} />
                <Body>
                    <Text>{content.data.user_name}</Text>
                    <Text note>{date}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {content.data.post}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Button 
                    type="clear" 
                    icon={<Ionicons name="md-heart-empty" size={40} color="pink" />} 
                    onPress={async ()=>{
                        await firebase
                        .firestore()
                        .collection("posts")
                        .doc(content.id)
                        .update(
                        {
                          likecount:like+1
                        }).catch((error)=>{
                          console.log(error)
                        });
                          
                        let likedjson={
                        postid:content.id,
                        receiver:content.data.user_email,
                        createdAt: firebase.firestore.Timestamp.now(),
                        sender:currentuser.displayName
                      };

                        await firebase
                        .firestore()
                        .collection("notifications")
                        .add(likedjson)
                        .catch((error)=>{
                          console.log(error)
                        });
                        
                    }}>
                    </Button>
                    <Text>{like}</Text>
                </Left>
                <Right>
                  <Button buttonStyle={{backgroundColor:'#3a0088'}} title="Comment" onPress={()=>navigation.navigate('Post',{post:content.id})}>
                  </Button>
                </Right>
            </CardItem>
          </Card>);
};


export default ShowPost;