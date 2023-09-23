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
        <View className="flex-1 justify-center items-center">
            <View className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center bg-white shadow-xl">
                <Text className="text-5xl font-bold mb-10">{login ? 'Log In' : 'Sign Up'}</Text>
                <View className="w-full">
                    {login ? null : <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="First Name" onChangeText={setFirstname}/>}
                    {login ? null : <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Last Name" onChangeText={setLastname}/>}
                    <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Email" onChangeText={setEmail}/>
                    <TextInput
                        className="mb-2 p-2 border border-[#713235] rounded"
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={setPassword}
                    />
                    <View className="my-5">
                        <Button
                            color={'#713235'}
                            className="text-white p-2 rounded"
                            title={login ? 'Log In' : 'Sign Up'}
                            onPress={login ? () => tryLogIn() : () => trySignUp()}
                        />
                    </View>

                    <Text className="mb-2 text-[#713235] text-center" onPress={() => setLogin(!login)}>
                        {login ? "Create an account" : 'I already have an account'}
                    </Text>
                    {login && (
                        <Text className="text-[#713235] text-center" onPress={sendPasswordResetEmail}>
                            Forgot your password?
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}

