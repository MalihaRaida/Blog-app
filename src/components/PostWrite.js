import React,{useState} from 'react';
import { View } from 'react-native';

import { Card, Button ,Input} from 'react-native-elements';
import { storeDataJSON} from '../functions/AsyncStorageFunctions';
import moment from 'moment';
import { Entypo} from '@expo/vector-icons';


function ShowCurrentDate() {
      var date = new moment().format('DD MMM YYYY');
      return date;
}


const PostWrite=({user})=>{
    const [post, setPost] = useState("");
    const input = React.createRef();
    function forceUpdateHandler(){
    this.forceUpdate();
  };
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
                    id=Math.floor((Math.random() * 100000) + 1);
                    if(post.length>0){
                        let newPost={
                        id:"post"+id,
                        post:post,
                        user:user.name,
                        date: ShowCurrentDate(),
                        likecount:0,
                        }
                        // console.log(newPost);
                        storeDataJSON("post"+id,newPost);
                        setPost("");
                        input.current.clear();
                    }
                    else {
                        alert("Input Field Empty");
                    }
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


export default PostWrite;