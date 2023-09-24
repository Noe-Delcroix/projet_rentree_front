import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { toaster } from 'evergreen-ui'
import {useApplicationContext} from "../components/AuthContext";

export default function LogIn({ navigation }) {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const { tryLogIn, trySignIn, sendPasswordResetEmail } = useApplicationContext();

    useEffect(() => {
        tryLogIn(undefined, undefined, undefined, undefined, navigation)
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{login ? 'Log In' : 'Sign In'}</Text>
        <View style={styles.formContainer}>
            {login ? <></> : <TextInput style={styles.input} placeholder="firstname" onChangeText={setFirstname}/>}
            {login ? <></> : <TextInput style={styles.input} placeholder="lastname" onChangeText={setLastname}/>}
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail}/>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={setPassword}
            />
            <Button
            title={login ? 'Log In' : 'Sign In'}
            onPress={login ? () => tryLogIn(email, password, firstname, lastname, navigation) : () => setLogin(trySignIn(email, password, firstname, lastname))}
            />
            <Text style={styles.toggleText} onPress={() => setLogin(!login)}>
            {login ? "I don't have an account already" : 'I already have an account'}
            </Text>
            <Text style={styles.forgotPassword} onPress={() => sendPasswordResetEmail(email)}>
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
