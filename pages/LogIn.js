import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import axios from 'axios';

export default function LogIn({navigation}){
    
    return (
        <View >
        <Text > Sign in </Text>
            <View>
                <TextInput 
                placeholder="Email" />
                <TextInput
                secureTextEntry={true}
                placeholder="Password"
                />
            </View>
            <Button 
            title="sign in"
            onPress={() =>
                navigation.navigate('Carte')
            }
            ></Button>
            <Text 
            onPress={() =>
                navigation.navigate('SignIn')
            }
            >I don't have an account already</Text>
            <Text>password forgotten ?</Text>
        </View>
    );
};