import React,{useState} from 'react';

import {Card, Button,CardItem, Left, Body, Right} from 'native-base';
import {Avatar} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet,Text} from 'react-native';

import {  mergeData} from '../functions/AsyncStorageFunctions';

import { AddLikeNotification } from "../functions/NotificationFunction";


const ShowPost=({content,currentuser})=>{
    const [like,setLike]=useState(content.likecount);
    return(<Card style={{flex: 0}}>
            <CardItem>
              <Left>
                    <Avatar size='medium' rounded
                    overlayContainerStyle={{backgroundColor: 'grey'}}
                    icon={{name: 'user', type: 'font-awesome'}} />
                <Body>
                    <Text>{content.user_name}</Text>
                    <Text note>{content.date}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {content.post}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent icon onPress={async ()=>{
                        await mergeData(content.id,JSON.stringify({likecount:like+1}));
                        let likedjson={
                          postid:content.id,
	                        receiver:content.user_email,
	                        sender:currentuser.name
                        };
                        await AddLikeNotification(likedjson)
                        setLike(like+1)
                    }}>
                    <Ionicons name="md-heart-empty" size={40} color="pink" />
                    </Button>
                    <Text>{like}</Text>
                </Left>
                <Right>
                  <Button style={{backgroundColor:'#3D6DCC', width:100,paddingLeft:15}}>
                    <Text style={{color:'white'}}>Comment</Text>
                  </Button>
                </Right>
            </CardItem>
          </Card>);
};


export default ShowPost;