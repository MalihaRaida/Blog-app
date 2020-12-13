import React from 'react';
import { View,StyleSheet } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import * as firebase from "firebase";
import "firebase/firestore";
import {
    Avatar,
    Title,
    Caption,
    Drawer
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomDrawer(props) {
    return(
    <AuthContext.Consumer>
            {(auth)=>
            ( 
            <View style={{flex:1}}>
            <DrawerContentScrollView >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                       <View style={{flexDirection:'row', marginTop:15}}>
                           <Avatar.Image
                           source={{ uri:'https://picsum.photos/id/473/5616/3744'}}
                           size={60}/>
                           <View style={{marginLeft:15,flexDirection:'column'}}>
                               <Title style={styles.title}>{auth.currentUser.displayName}</Title>
                               <Caption style={styles.caption}>{auth.currentUser.email}</Caption>
                           </View>
                        </View> 
                       <Drawer.Section style={styles.drawerSection}>
                           <DrawerItem
                           icon={()=><Icon name="home-outline" color="#3a0088" size={30}/>}
                           labelStyle={{color:"#3a0088"}}
                           label='Home'
                           onPress={()=>{props.navigation.navigate('Home')}}
                           />
                           <DrawerItem
                           icon={()=><Icon name="account-outline" color="#14274e" size={30}/>}
                           labelStyle={{color:"#14274e"}}
                           label='Profile'
                           onPress={()=>{
                               props.navigation.navigate('Profile',{user:auth.currentUser.uid})}}
                           />
                            <DrawerItem 
                            icon={() => (
                                <Icon 
                                name="settings-outline" 
                                color='#4D280F'
                                size={30}
                                />
                            )}
                            labelStyle={{color:"#4D280F"}}
                            label="Settings"
                            onPress={() => {
                                props.navigation.navigate('SettingsScreen',{user:auth.currentUser.uid})}}
                        />
                       </Drawer.Section>
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={() => (
                        <Icon 
                        name="exit-to-app" 
                        color='#C70039'
                        size={30}
                        />
                    )}
                    labelStyle={{color:'#C70039'}}
                    label="Sign Out"
                    onPress={() => {
                        firebase
                        .auth()
                        .signOut()
                        .then(()=>{
                            auth.setisLogged(false);
                            auth.setcurrentUser({});
                        }).catch((error)=>console.log(error))
                    }}
                />
            </Drawer.Section>
        </View>)}
   </AuthContext.Consumer> 
    );
};

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    
  });