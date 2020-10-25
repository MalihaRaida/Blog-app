

import React,{useState} from 'react';

import {Card, Button,CardItem, Left, Body, Right} from 'native-base';
import {Avatar} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet,Text} from 'react-native';

const ShowPost=({writer,post,date,likes})=>{
    const [likecount,setLikeCount]=useState(likes);
    return(<Card style={{flex: 0}}>
            <CardItem>
              <Left>
                    <Avatar size='medium' rounded
                    overlayContainerStyle={{backgroundColor: 'grey'}}
                    icon={{ name: 'user', type: 'font-awesome'}} />
                <Body>
                    <Text>{writer}</Text>
                    <Text note>{date}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {post}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent icon onPress={()=>{
                        setLikeCount(likecount+1)
                    }}>
                    <Ionicons name="md-heart-empty" size={40} color="pink" />
                    </Button>
                    <Text>{likecount}</Text>
                </Left>
                <Right>
                  <Text>comment</Text>
                </Right>
            </CardItem>
          </Card>);
};


export default ShowPost;