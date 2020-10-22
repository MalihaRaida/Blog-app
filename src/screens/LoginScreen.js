import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground,StyleSheet, Text, View } from 'react-native';
import { Card,Input, Button } from 'react-native-elements';
import { AntDesign,MaterialIcons  } from '@expo/vector-icons';
import {AuthContext} from './../providers/AuthProvider';
import {getDataJSON} from './../functions/AsyncStorageFunctions';


const LoginScreen =(props)=> {
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    return(
        <AuthContext.Consumer>
            {(auth)=>
            (
            <View style={styles.container}>
                <StatusBar
                hidden={true}
                backgroundColor="blue"
                barStyle="light-content"/>
                <ImageBackground
                style={styles.image}
                source={require('./../../assets/coast-rocks-blue-green-sea-nature-small.jpg')}>
                <Text style={styles.text}>TRAVELS</Text>
            
                <Card containerStyle={styles.card} >
                    <Card.Title style={{fontSize:20}}>Log In</Card.Title>
                    <Card.Divider />
                    <Input
                    leftIcon={<MaterialIcons name="mail-outline" size={24} color="black"/>}
                    placeholder="E-mail Address"
                    onChangeText={function (input) {
                    setEmail(input);
                }}/>
                    <Input 
                    leftIcon={<MaterialIcons name="vpn-key" size={24} color="black"/>}
                    placeholder="Password" 
                    secureTextEntry={true} 
                    onChangeText={function (input) {
                    setPassword(input);
                }}/>
                    <Button
                    icon={<AntDesign name="login" size={24} color="white" />}
                    titleStyle={{paddingLeft:10}}
                    title="Log In!"
                    type="solid"
                    onPress={async ()=>{
                        let user= await getDataJSON(email);
                        if(user.password==password)
                        {
                            auth.setisLogged(true);
                            auth.setcurrentUser(user);
                        }
                        else
                            alert("Login credentials Invalid");
                        
                    }}
                    />
                    <Button
                    type="clear"
                    title="Join as a new member"
                    onPress={function () {
                        props.navigation.navigate("Sign Up");
                    }}
                    />
                </Card>
                </ImageBackground>
            </View>)
            }
        </AuthContext.Consumer>
        );
}

const styles=StyleSheet.create({
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        fontFamily:"san-serif",
        borderRadius:10
    }
    
});

export default LoginScreen;