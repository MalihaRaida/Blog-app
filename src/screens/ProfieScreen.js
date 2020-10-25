import React from 'react';
import {View,StyleSheet} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';

import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';

const ProfileScreen =()=>{
    return(
         <AuthContext.Consumer>
            {(auth)=>
            (<View style={styles.container}>
                <View style={styles.userInfo}>
                    <Avatar.Image
                    
                    source={{
                        uri:'https://picsum.photos/200',
                    }}
                    size={80}
                    />
                    <Title style={styles.title}>{auth.currentUser.name}</Title>
                    <Caption style={styles.caption}>{auth.currentUser.email}</Caption>
                </View>
            </View>)}
        </AuthContext.Consumer>
        
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    userInfo:{
        marginTop:70,
        paddingHorizontal:30,
        marginBottom:25,
    },
    title:{
        paddingTop:10,
        paddingLeft:10,
        fontSize:24,
        fontWeight:"bold"
    },
    caption:{
        paddingLeft:10,
        fontSize:14,
        lineHeight:14,
        fontWeight:'500',
    }
});


export default ProfileScreen;