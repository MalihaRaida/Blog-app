import React,{useState} from 'react';
import { View } from 'react-native';

import { Card, Button ,Input} from 'react-native-elements';
import { AddNotification} from '../functions/NotificationFunction';


const WriteComment=({user})=>{
    const [comment, setComment] = useState("");
    const input = React.createRef();
    return(<Card containerStyle={{borderRadius:10,marginLeft:5,marginRight:5, shadowOffset:10}}>
        <View style={{flexDirection:'row'}}>
            <Input
            ref={input}
            placeholder='Comment Here'
            multiline={true}
            onChangeText={(text)=>{
                setComment(text); 
            }}
            rightIcon={<Button 
                type="clear" 
                disabled={comment.length==0?true:false}
                title='Comment' 
                titleStyle={{color:'#e61c5d'}} onPress={() =>alert("koko")}/>}
            />

        </View>
    </Card>);
}

export default WriteComment;
