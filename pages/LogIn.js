import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function LogIn({ navigation }) {
    const [login, setLogin] = useState(true);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{login ? 'Log In' : 'Sign In'}</Text>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            />
            <Button
            title={login ? 'Log In' : 'Sign In'}
            onPress={() => navigation.navigate('Carte')}
            />
            <Text style={styles.toggleText} onPress={() => setLogin(!login)}>
            {login ? "I don't have an account already" : 'I already have an account'}
            </Text>
            <Text style={styles.forgotPassword}>
            {login ? 'Password forgotten ?' : ''}
            </Text>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5DC', // Beige background color
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formContainer: {
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    toggleText: {
        textAlign: 'center',
        marginTop: 10,
        color: 'blue', // You can change the color
    },
    forgotPassword: {
        textAlign: 'center',
        marginTop: 10,
        color: 'red', // You can change the color
    },
});
