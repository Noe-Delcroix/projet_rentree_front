import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { toaster } from 'evergreen-ui'
import {useApplicationContext} from "../components/ApplicationContext";

export default function LogIwn({ navigation }) {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const { setToken } = useApplicationContext();

    useEffect(() => {
        try {
            axios.get('http://localhost:8080/api/users/info', ).then((response) => {
                navigation.navigate('Carte')
            });
        } catch (error) {
        }
    }, []);
    const tryLogIn = () => {
        console.log(email)
        console.log(password)
        axios.post('http://localhost:8080/api/users/login', {
            email:email,
            password:password
        }).then((response) => {
            console.log(response);
            setToken(response.data)
            navigation.navigate('Carte')
        }, (error) => {
            toaster.warning(error.response.data)
        });
    }

    const trySignIn = () => {
        console.log(firstname)
        console.log(lastname)
        console.log(email)
        console.log(password)
        
        axios.post('http://localhost:8080/api/users/register', {
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:password
        }).then((response) => {
            toaster.success('Votre compte a bien été crée!')
            setLogin(!login)
        }, (error) => {
            console.log(error)
            toaster.warning(error.response.data)
        });
    }


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
            onPress={login ? () => tryLogIn() : () => trySignIn()}
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
