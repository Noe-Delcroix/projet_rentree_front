import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';

export default function SignIn({navigation}){

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
            <Button title="Sign In"></Button>
            <Text 
            onPress={() =>
                navigation.navigate('logIn')
            }
            >I already have an account</Text>
        </View>
    );
};