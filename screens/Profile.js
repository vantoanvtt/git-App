import React from 'react';
import { StyleSheet, Text, View, Image ,Linking, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Card} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import ButtonForm from '../components/ButtonForm';

const InfoCard = (props) => {
    return (
        <View style={styles.InfoCard}>
            <Card style={styles.card} onPress={() => {
                if(props.type == 'email') {
                    Linking.openURL("mailto:"+ props.info);
                }
                else {
                    Linking.openURL("tel:" + props.info);
                }
            }}>
                <View style={{flexDirection: 'row'}}>
                <MaterialIcons name={props.iconName} size={35} color="#1D48D3" />
                <Text style={styles.cardText}>{props.info}</Text>
                </View>
            </Card>
        </View>
    );
}
const Profile = (props) => {
    const {_id, position, name, picture, phone, salary, email} = props.route.params.item;
    const deleteEmploy = () => {
        fetch("http://192.168.1.30:3000/delete",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        })
        .then(res => res.json())
        .then(deleteEp => {
            Alert.alert(`${deleteEp.name} deleted`)
            props.navigation.navigate("Home")
        }).catch(err => {
            Alert.alert("something went wrong")
        })
    }

    return (
        <View style={styles.root}>
            <LinearGradient 
                colors={["#0E4BEF","#B4BDD6"]}
                style={{height: '20%'}}
            />
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{uri: picture}}
                />
                <Text style={styles.avtarTitle}>{name}</Text>
                <Text>{position}</Text>
            </View>

            <View>
                <InfoCard iconName='email' info={email} type='email' />
                <InfoCard iconName='phone' info={phone} type='tel' />
                <InfoCard iconName='star' info={salary} />
            </View>
            <View style={styles.buttonGroup}>
                <ButtonForm iconName='edit' title='EDIT' onPress={() => {
                    props.navigation.navigate("Create",{_id, position, name, picture, phone, salary, email})
                }} />
                <ButtonForm iconName='erase' title='FIRE EMPLOYEE' onPress={deleteEmploy} />
            </View>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginTop: -50,
    },
    avatarContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    avtarTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    InfoCard: {
        paddingVertical: 5,
    },
    card: {
        borderColor: '#22B725',
        borderWidth: 1,
    },
    cardText: {
        marginLeft: 15,
    },
    buttonGroup: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
    },
});