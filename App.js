import React from 'react';

import { StyleSheet} from 'react-native';
import * as firebase from "firebase";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SinglePostScreen from './src/screens/SinglePostScreen';
import {AuthProvider,AuthContext} from './src/providers/AuthProvider';
import NotificationScreen from './src/screens/NotificationScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from './src/screens/ProfieScreen';
import SettingScreen from './src/screens/SettingScreen';
import CustomDrawer from "./src/screens/CustomDrawer";

 const firebaseConfig = {
    apiKey: "AIzaSyA1y5rLtRUCp84ZAEJv8ldFKksSrS0olVI",
    authDomain: "blogapp-2852.firebaseapp.com",
    projectId: "blogapp-2852",
    storageBucket: "blogapp-2852.appspot.com",
    messagingSenderId: "35208079373",
    appId: "1:35208079373:web:6981616927e65eb5b18d44"
  };
const Authstack = createStackNavigator();
const Notificationstack = createStackNavigator();
const HomeTab= createMaterialBottomTabNavigator();
const Drawer=createDrawerNavigator();


const DrawerScreens=()=>{
  return(
    <Drawer.Navigator 
    initialRouteName="Home" 
    drawerContent={props=> <CustomDrawer {...props}/>}>
        <Drawer.Screen name="Home" component={NotificationScreenStack} />
        <Drawer.Screen name="Profile"  component={ProfileScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="SettingsScreen" component={SettingScreen} options={{ headerShown: false }}/>
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
          tabBarColor: '#3a0088',
          tabBarIcon: ({color}) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
        />
      <HomeTab.Screen name="Notification" 
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notification',
          tabBarColor: '#930077',
          tabBarIcon: ({color}) => (
           <Ionicons name="ios-notifications" size={24} color={color} />
          ),
        }} />
    </HomeTab.Navigator>);
};


const NotificationScreenStack=()=>{
  return(<Notificationstack.Navigator >
    <Notificationstack.Screen name="Home" component={HomeScreenTab} options={{ headerShown: false }}/>
    <Notificationstack.Screen name="Post" component={SinglePostScreen} options={{ headerShown: false }}/>
  </Notificationstack.Navigator>)

};

const AuthScreenStack=()=> {
  return(<Authstack.Navigator >
    <Authstack.Screen name='Log In' component={LoginScreen} options={{ headerShown: false }}/>
    <Authstack.Screen name='Sign Up' component={SignupScreen} options={{ headerShown: false }}/>
  </Authstack.Navigator>);
};

export default function App() {
  if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }
  else
    firebase.app();
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
