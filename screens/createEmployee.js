import React, { useState } from 'react';
import {Modal,View, StyleSheet, Text, Image, FlatList,TextInput, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
//import {TextInput, Button} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import ButtonForm from '../components/ButtonForm';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const EnterInfo = (props) => {
    return (
        <TextInput
            style={styles.inputStyle}
            onChangeText={props.onSubmit}
            keyboardType={props.keyboardType}
            placeholder={"  Enter " + props.typeName}
            value={props.value}
        />
    );
}



const CreateEmployee = ({navigation,route}) => {

    const getDetails = (type) => {
        if(route.params) {
            switch(type) {
                case "name":
                    return route.params.name
                case "email":
                    return route.params.email
                case "phone":
                    return route.params.phone
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
            
        }
        return ""
    }

    const [name, setName] = useState(getDetails("name"));
    const [email, setEmail] = useState(getDetails("email"));
    const [phone, setPhone] = useState(getDetails("phone"));
    const [modal, setModal] = useState(false);
    const [salary, setSalary] = useState(getDetails("salary"));
    const [picture, setPicture] = useState(getDetails("picture"));
    const [position, setPosition] = useState(getDetails("position"));


    const submitData = ()=>{
        fetch("http://192.168.1.30:3000/send-data",{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is saved successfuly`)
            navigation.navigate("Home")
        })
        .catch(err=>{
            console.log(err)
            Alert.alert("someting went wrong")
      })
  }

  const updateDetails = () => {
    fetch("http://192.168.1.30:3000/update",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            id: route.params._id,
            name,
            email,
            phone,
            salary,
            picture,
            position
        })
    })
    .then(res=>res.json())
    .then(data=>{
        Alert.alert(`${data.name} is updated`)
        navigation.navigate("Home")
    })
    .catch(err=>{
        console.log(err)
        Alert.alert("someting went wrong")
  })
  }

    const pickFromGallery = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
             let data =  await ImagePicker.launchImageLibraryAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
              if(!data.cancelled){
                  let newfile = { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}` 
                    
                }
                  handleUpload(newfile)
              }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }

     const pickFromCamera = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
             let data =  await ImagePicker.launchCameraAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
            if(!data.cancelled){
                let newfile = { 
                  uri:data.uri,
                  type:`test/${data.uri.split(".")[1]}`,
                  name:`test.${data.uri.split(".")[1]}` 
  
              }
                handleUpload(newfile)
            }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }

    const handleUpload = (image) => {
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset", "employApp");
        data.append("cloud_name", "vantoanvtt37");

        fetch("https://api.cloudinary.com/v1_1/vantoanvtt37/image/upload",{
                method:'POST',
                body:data
            }).then(res => res.json())
            .then(data => {
                setPicture(data.url)
                setModal(false)
                //console.log(data)
            }).catch(err => {
                Alert.alert("Error While Uploading")
            })
    }

    return (
        <View style={styles.root}>
            <KeyboardAvoidingView behavior="position">
                <EnterInfo onSubmit={setName} typeName={'Name'} value={name} />
                <EnterInfo onSubmit={setEmail} typeName={'Email'} keyboardType={'email-address'} value={email} />
                <EnterInfo onSubmit={setPhone} typeName={'Phone'} value={phone} />
                <EnterInfo onSubmit={setSalary} typeName={'Salary'} value={salary} />
                <EnterInfo onSubmit={setPosition} typeName={'Position'} value={position} />
                <ButtonForm iconName='upload' title={'UPLOAD IMAGE'} onPress={() => {setModal(true)}}/>
                {
                    route.params?
                    <ButtonForm iconName='save' title={'UPDATE'} onPress={updateDetails}/>
                    :
                    <ButtonForm iconName='save' title={'SAVE'} onPress={submitData}/>
                }

                <Modal
                animationType='slide'
                transparent={true}
                visible={modal} 
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
                >
                    <View style={styles.modalStyle}>
                        <View style={styles.buttonGroup}>
                            <ButtonForm iconName='camera' title='CAMERA' onPress={pickFromCamera}/>
                            <ButtonForm iconName='images' title='PHONE' onPress={pickFromGallery} />
                        </View>
                        <ButtonForm title='CANCLE'onPress={() => {setModal(false)}} />
                    </View>

                </Modal>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputStyle: {
        //flex: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 50,
        //width: 300,
        margin: 6,
        borderColor: '#6E727F',
        borderWidth: 2,
    },
    
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    modalStyle: {
        justifyContent: 'flex-end',
        height: '100%',
        bottom: 5,
    }
});

export default CreateEmployee;