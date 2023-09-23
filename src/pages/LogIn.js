import React, {useEffect, useState} from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { toaster } from 'evergreen-ui'
import {useApplicationContext} from "../components/ApplicationContext";

export default function LogIn({ navigation }) {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const { setToken } = useApplicationContext();

    useEffect(() => {
        try {
            axios.get('http://localhost:8080/api/users/info', ).then((response) => {
                navigation.replace('Carte')
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
            navigation.replace('Carte')
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

    const sendPasswordResetEmail = () => {
        console.log(email)
        axios.get(`http://localhost:8080/api/users/resetPasswordMail?email=${email}`, {
            email:email,
        }).then((response) => {
            console.log(response);
            toaster.success('Un email vous a été envoyé!')
        }, (error) => {
            console.log(error)
            toaster.warning(error.response.data)
        });
    }

    return (
        <View>
        <Text className="text-6xl font-bold">{login ? 'Log In' : 'Sign In'}</Text>
        <View>
            {login ? <></> : <TextInput placeholder="firstname" onChangeText={setFirstname}/>}
            {login ? <></> : <TextInput placeholder="lastname" onChangeText={setLastname}/>}
            <TextInput placeholder="Email" onChangeText={setEmail}/>
            <TextInput
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={setPassword}
            />
            <Button
            title={login ? 'Log In' : 'Sign In'}
            onPress={login ? () => tryLogIn() : () => trySignIn()}
            />
            <Text onPress={() => setLogin(!login)}>
            {login ? "I don't have an account already" : 'I already have an account'}
            </Text>
            <Text onPress={sendPasswordResetEmail}>
            {login ? 'Password forgotten ?' : ''}
            </Text>
        </View>
        </View>
    );
}

