import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import {AuthProvider,AuthContext} from './src/providers/AuthProvider';


const Authstack = createStackNavigator();
const Homestack= createStackNavigator();

const HomeScreenStack=()=> {
  return(<Homestack.Navigator >
    <Homestack.Screen name='Home' component={HomeScreen}/>
  </Homestack.Navigator>);
};

const AuthScreenStack=()=> {
  return(<Authstack.Navigator >
    <Authstack.Screen name='Log In' component={LoginScreen} options={{ headerShown: false }}/>
    <Authstack.Screen name='Sign Up' component={SignupScreen} options={{ headerShown: false }}/>
  </Authstack.Navigator>);
};

export default function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth)=>(
          <NavigationContainer>
            {auth.isLogged?<HomeScreenStack/>:<AuthScreenStack/>}
          </NavigationContainer>)}
      </AuthContext.Consumer>
    </AuthProvider>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
