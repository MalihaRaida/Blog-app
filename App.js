import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import {AuthProvider,AuthContext} from './src/providers/AuthProvider';
import NotificationScreen from './src/screens/NotificationScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from './src/screens/ProfieScreen';


const Authstack = createStackNavigator();
const HomeTab= createMaterialBottomTabNavigator();
const Drawer=createDrawerNavigator();

const DrawerScreens=()=>{
  return(
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreenTab} />
        <Drawer.Screen name="Profile" component={ProfileScreen}/>
        {/* <Drawer.Screen name="Notifications" component={NotificationScreen}/> */}
  </Drawer.Navigator>
  ); 
}

const HomeScreenTab=()=> {
  return(
    <HomeTab.Navigator 
    initialRouteName="Home"
      activeColor="#FFFFFF"
      shifting={true}>
      <HomeTab.Screen name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#3D6DCC',
          tabBarIcon: ({color}) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
        />
      <HomeTab.Screen name="Notification" 
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notification',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
           <Ionicons name="ios-notifications" size={24} color={color} />
          ),
        }} />
    </HomeTab.Navigator>);
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
            {auth.isLogged?<DrawerScreens/>:<AuthScreenStack/>}
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
