import React, { useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const ButtonForm = (props) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <View style={{flexDirection: 'row'}}> 
                <Entypo name={props.iconName} size={24} color="white" />
                <Text style={styles.buttonText}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ButtonForm;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#165DD0',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        marginLeft: 15
    },
});