import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';

const Authstack = createStackNavigator();
const Homestack= createStackNavigator();

const HomeScreenStack=()=> {
  return(<Homestack.Navigator >
    <Homestack.Screen name='Home' component={HomeScreen}/>
  </Homestack.Navigator>);
}




export default function App() {
  return (
    <NavigationContainer>
      <HomeScreenStack/>
    </NavigationContainer>
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
