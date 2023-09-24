import React, {useEffect, useState} from 'react';
import { Text, View, TextInput, Button } from 'react-native';
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
                            onPress={login ? () => tryLogIn(email, password, firstname, lastname, navigation) : () => setLogin(trySignIn(email, password, firstname, lastname))}
                        />
                    </View>

                    <Text className="mb-2 text-[#713235] text-center" onPress={() => setLogin(!login)}>
                        {login ? "Create an account" : 'I already have an account'}
                    </Text>
                    {login && (
                        <Text className="text-[#713235] text-center" onPress={() => sendPasswordResetEmail(email)}>
                            Forgot your password?
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}

