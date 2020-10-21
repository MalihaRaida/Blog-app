import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground,StyleSheet, Text, View } from 'react-native';
import { Card,Input, Button } from 'react-native-elements';

const LoginScreen =(props)=> {
    return(
        <View style={styles.container}>
             <StatusBar
            hidden={true}
            backgroundColor="blue"
            barStyle="light-content"/>
            <ImageBackground
            style={styles.image}
            source={require('./../../assets/coast-rocks-blue-green-sea-nature-small.jpg')}>
            <Text style={styles.text}>TRAVELS</Text>
            <View
            style={styles.logo}/>
            <Card containerStyle={styles.card}>
                <Card.Title>Log In</Card.Title>
                <Card.Divider />
                <Input
                leftIcon={{type: 'font-awesome', style:{marginRight:5},name: 'envelope'}}
                placeholder="E-mail Address"/>
                <Input 
                leftIcon={{type:'font-awesome' ,style:{marginRight:5}, name: 'key'}}
                placeholder="Password" secureTextEntry={true} />
                <Button
                title="  Sign In!"
                type="solid"/>
                <Button
                type="clear"
                title="  Don't have an account?"/>
            </Card>
            </ImageBackground>
            
        </View>
    
        );
}

const styles=StyleSheet.create({
    logo:{
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 5,
        marginLeft:50,
        marginRight:50,
        marginBottom:70
    },
    container:{
        flex:1,
        justifyContent: "center",
        
    },
    image:{
        flex:1,
        justifyContent: "center",
    },
    text:{
        textAlignVertical: "center",
        textAlign: "center",
        color:"#FFFFFF",
        fontSize:30,
        paddingBottom:10,
    },
    card:{
        
        borderRadius:10
    }
    
});

export default LoginScreen;