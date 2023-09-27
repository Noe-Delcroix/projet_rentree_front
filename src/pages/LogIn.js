import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, Button, Pressable} from 'react-native';
import axios from 'axios';
import { toaster } from 'evergreen-ui'
import {useApplicationContext} from "../components/AuthContext";
import {addDishesToBasket} from "../slices/Basket";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/CustomButton";

export default function LogIn({ navigation }) {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const { tryLogIn, trySignIn, sendPasswordResetEmail } = useApplicationContext();

    useEffect(() => {
        const handleKeyDown = async (event) => {
            console.log(event.key)
            if (event.key === "Enter") {
                if (login) {
                    tryLogIn(email, password, navigation);
                } else {
                    const res = await trySignIn(email, password, firstname, lastname, address);
                    setLogin(res);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [email, password, firstname, lastname, address, login, tryLogIn, trySignIn, navigation]);


    return (
        <View className="flex-1 justify-center items-center">
            <View className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center bg-white shadow-xl">
                <Text className="text-5xl font-bold mb-10">{login ? 'Se connecter' : 'Créer un compte'}</Text>
                <View className="w-full">
                    {login ? null : <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Prénom" onChangeText={setFirstname}/>}
                    {login ? null : <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Nom" onChangeText={setLastname}/>}
                    {login ? null : <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Adresse" onChangeText={setAddress}/>}
                    <TextInput className="mb-2 p-2 border border-[#713235] rounded" placeholder="Adresse mail" onChangeText={setEmail}/>
                    <PasswordInput id={"motDePasseActuel"} onChangeTextFunction={setPassword}/>

                    <CustomButton text={login ? 'Connexion' : 'Je crée mon compte'} onPress={login ? () => tryLogIn(email, password, navigation) : async () => {
                        const res = await trySignIn(email, password, firstname, lastname, address)
                        setLogin(res);
                    }}/>

                    <Text className="mb-2 text-[#713235] text-center" onPress={() => setLogin(!login)}>
                        {login ? "Créer un compte" : 'J\'ai déja un compte'}
                    </Text>
                    {login && (
                        <Text className="text-[#713235] text-center" onPress={() => sendPasswordResetEmail(email)}>
                            Mot de passe oublié ?
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}

