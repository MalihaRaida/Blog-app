import React,{useState} from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';

const SignupScreen =(props)=> {
    return(
        <View>
            <Text style={styles.TextStyle}>
            Hello from HomeScreen
            </Text>
            <Button 
            title="Log In"
            onPress={
                function(){
                props.navigation.navigate('Log In');
                }}>
            </Button>
        </View>
    
        );
}

const styles=StyleSheet.create({
    TextStyle:{
        fontSize:30,
        color:'blue',
    },
});

export default SignupScreen;