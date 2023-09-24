import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from "axios";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/AuthContext";
import {toaster} from "evergreen-ui";
import {useDispatch, useSelector} from "react-redux";
import {loadUserInfo} from "../features/dishes/User";

const ProfileScreen = ({ navigation, route }) => {
    const { resetPassword, handleLogOut } = useApplicationContext();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);


    useEffect(() => {
        dispatch(loadUserInfo());
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Prénom :</Text>
            <Text style={styles.text}>{user?.firstname}</Text>

            <Text style={styles.label}>Nom :</Text>
            <Text style={styles.text}>{user?.lastname}</Text>

            <Text style={styles.label}>Courriel :</Text>
            <Text style={styles.text}>{user?.email}</Text>

            <Text style={styles.label}>Adresse :</Text>
            <Text style={styles.text}>{user?.address}</Text>

            <Text style={styles.label}>Solde :</Text>
            <Text style={styles.text}>{user?.balance +' €'}</Text>


            <Text style={styles.label}>Mot de passe actuel</Text>
            <input id={"motDePasseActuel"}></input>
            <Text style={styles.label}>Nouveau mot de passe</Text>
            <input id={"nouveauMotDePasse"}></input>
            <Button
                title="Modifier le mot de passe"
                onPress={() => {
                    resetPassword(
                        document.getElementById("motDePasseActuel").value,
                        document.getElementById("nouveauMotDePasse").value,
                        user.email
                    )
                }}
            />
            <Button title={"Déconnexion"} onPress={() => {
                handleLogOut(navigation)
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
