import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground,StyleSheet, Text, View } from 'react-native';
import { Card,Input, Button } from 'react-native-elements';
import { AntDesign,Ionicons,MaterialIcons,Feather  } from '@expo/vector-icons';

const SignupScreen =(props)=> {
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
            <Card containerStyle={styles.card}>
                <Card.Title style={{fontSize:20}}>Sign Up</Card.Title>
                <Card.Divider />
                <Input 
                leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
                placeholder="Username" />
                <Input 
                leftIcon={<Ionicons name="md-school" size={24} color="black" />}
                placeholder="StudentID" />
                <Input
                leftIcon={<MaterialIcons name="mail-outline" size={24} color="black"/>}
                placeholder="E-mail Address"/>
                <Input 
                leftIcon={<MaterialIcons name="vpn-key" size={24} color="black"/>}
                placeholder="Password" 
                secureTextEntry={true} />
                
                <Button
                icon={<Feather name="user" size={25} color="white" />}
                titleStyle={{paddingLeft:10}}
                title="Sign up!"
                type="solid"
                />
                <Button
                type="clear"
                title="Already have an account"
                onPress={function () {
                    props.navigation.navigate("Log In");
                }}
                />
            </Card>
            </ImageBackground>  
        </View>
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

export default SignupScreen;