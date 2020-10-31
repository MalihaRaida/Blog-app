import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../providers/AuthProvider';
import {View, StyleSheet} from 'react-native';
import { Header,Input,Button} from 'react-native-elements';
import { FontAwesome,Ionicons,Entypo,Feather } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Title,
    Caption,
} from 'react-native-paper';

import { mergeData } from "./../functions/AsyncStorageFunctions";

const SettingScreen=({navigation})=>{
    const [Location,setLocation]=useState("")
    const [school,setSchool]=useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date,setDate]=useState("");

    const showDatePicker = () => {
    setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date.toString().slice(4,15));
        hideDatePicker();
    };
    return(<AuthContext.Consumer>
        {(auth)=>(
            <View>
                <StatusBar style="light"/>
                <Header
                    containerStyle={{
                    backgroundColor: '#14274e',
                    justifyContent: 'space-around',}}
                    leftComponent={<Ionicons name="md-menu" size={25} color="white" onPress={()=>{
                        navigation.openDrawer();
                    }}/>}
                    centerComponent={{ text: 'Profile', style: {fontSize:20, color: 'white' } }}
                    />

                    <View style={{alignItems:'center',marginTop:50,marginBottom:20,marginLeft:10}}>
                        <Title style={styles.title}>{auth.currentUser.name}</Title>
                        <Caption style={styles.caption}>{auth.currentUser.email}</Caption>
                    </View>
                    <View style={{alignContent:'center',padding:10}}>
                         <Input
                            placeholder={auth.currentUser.location==null||auth.currentUser.location=="" ?"Location":auth.currentUser.location}
                            defaultValue={auth.currentUser.location}
                            leftIcon={<Feather name="map-pin" size={24} color="#777777" />}
                            containerStyle={{backgroundColor:'white',borderRadius:10,paddingTop:10,shadowOpacity:50,marginBottom:10}}
                            onChangeText={value => setLocation(value)}
                            />
                            <Button
                                type="clear"
                                buttonStyle={{backgroundColor:'white',borderRadius:10,padding:20,shadowOpacity:50,marginBottom:10}}
                                titleStyle={{color:'#777777',marginLeft:10}}
                                icon={<FontAwesome name="birthday-cake" size={24} color="#777777" />}
                                title={auth.currentUser.bday==null||auth.currentUser.bday==""||date==""?"Select Birthday Date":date}
                                onPress ={showDatePicker}
                            />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        <Input
                            placeholder={auth.currentUser.works==null||auth.currentUser.works=="" ?"Institution":auth.currentUser.works}
                            leftIcon={<FontAwesome name="institution" size={24} color="#777777" />}
                            containerStyle={{backgroundColor:'white',borderRadius:10,paddingTop:10,shadowOpacity:50,marginBottom:10}}
                            onChangeText={value => setSchool(value)}
                        />
                            <Button
                                type='clear'
                                title="save"
                                titleStyle={{color:'white',marginLeft:10}}
                                buttonStyle={{backgroundColor:'#14274e',borderRadius:10,padding:20,shadowOpacity:50,marginTop:20,marginHorizontal:50}} 
                                icon={<Entypo name="save" size={24}  color="white" />}
                                onPress={async()=>{
                                    let userInfo={
                                        location:Location,
                                        works:school,
                                        bday:date
                                    }
                                    console.log(userInfo)

                                    let update=await mergeData(auth.currentUser.email,JSON.stringify(userInfo))
                                    if (update){
                                        alert("User Details Updated")
                                        auth.setisLogged(false);
                                        auth.setcurrentUser({});
                                    }
                                        
                                }}/>
                    
                    
                    </View>
            </View>
        )}
    </AuthContext.Consumer>)
}

const styles=StyleSheet.create({
    title:{
        fontSize:24,
        fontWeight:"bold"
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        fontWeight:'500',
    },

});




export default SettingScreen;