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
        <View style={styles.container}>
            <Text style={styles.label}>Prénom :</Text>
            <Text style={styles.text}>{user.firstname}</Text>

            <Text style={styles.label}>Nom :</Text>
            <Text style={styles.text}>{user.lastname}</Text>

            <Text style={styles.label}>Courriel :</Text>
            <Text style={styles.text}>{user.email}</Text>

            <Text style={styles.label}>Adresse :</Text>
            <Text style={styles.text}>{user.address}</Text>

            <Text style={styles.label}>Solde :</Text>
            <Text style={styles.text}>{user.balance +' €'}</Text>

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
            <View style={styles.bottomNavContainer}>
                <BottomNavigationBar navigation={navigation}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        height: '100%'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 16,
    },
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    pageView: {
        height: '100%'
    }
});

export default ProfileScreen;
