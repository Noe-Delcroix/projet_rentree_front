import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from "axios";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/ApplicationContext";

const ProfileScreen = ({ navigation, route }) => {
    const [user, setUser] = useState({})
    const { token } = useApplicationContext();

    const config = {
        headers: {
            token: token,
        },
    };

    console.log(route.params)

    const loadUserInfo = async () => {
        try {
            axios.get('http://localhost:8080/api/users/info', config).then((response) => {
                console.log(response.data)
                setUser(response.data);
            });
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
        }
    };

    const handleLogOut = () => {
        try {
            axios.post('http://localhost:8080/api/users/logout').then((response) => {
                console.log(response.data)
                navigation.navigate('LogIn')
            })} catch (error) {
            console.log('ERREUR');

        }
    }

    useEffect(() => {
        loadUserInfo();
    }, []);
    return (
        <View>
            <Text>Prénom :</Text>
            <Text>{user.firstname}</Text>

            <Text>Nom :</Text>
            <Text>{user.lastname}</Text>

            <Text>Courriel :</Text>
            <Text>{user.email}</Text>

            <Text>Adresse :</Text>
            <Text>{user.address}</Text>

            <Text>Solde :</Text>
            <Text>{user.balance +' €'}</Text>

            <Button
                title="Modifier le mot de passe"
                onPress={() => {
                    // TODO : modif mdp
                }}
            />
            <Button title={"Déconnexion"} onPress={() => {
                handleLogOut()
            }}/>
            <Button title={"voir ancienne commande"} onPress={() => {
                navigation.navigate('SeeOrder')
            }}/>
            <View>
                <BottomNavigationBar navigation={navigation}/>
            </View>
        </View>
    );
};

export default ProfileScreen;
