import  React from "react";
import { View } from "react-native";
import {AuthContext} from '../providers/AuthProvider';
import { Header} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const SinglePostScreen=({navigation})=>{

    return(
        <AuthContext.Consumer>
            {(auth)=>
            (
                <View >
                    <StatusBar style="light"/>
                    <Header
                    containerStyle={{
                    backgroundColor: '#68ba54',
                    justifyContent: 'space-around',}}
                    leftComponent={<Ionicons name="md-arrow-back" size={25} color="white" onPress={()=>{
                        navigation.goBack();
                    }}/>}
                    centerComponent={{ text: 'Post', style: { fontSize:20,color: '#fff' } }}
                    rightComponent={<Ionicons name="md-lock" size={25} color="white" 
                    onPress={()=>{
                        auth.setisLogged(false);
                        auth.setcurrentUser({});
                    }}/>}
                    />
                </View>
                )}
        </AuthContext.Consumer>
    );


};



export default SinglePostScreen;