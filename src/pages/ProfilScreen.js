import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import axios from "axios";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/AuthContext";
import {toaster} from "evergreen-ui";
import {useDispatch, useSelector} from "react-redux";
import {loadUserInfo} from "../slices/User";

const ProfileScreen = ({ navigation, route }) => {
    const { resetPassword, handleLogOut } = useApplicationContext();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    useEffect(() => {
        dispatch(loadUserInfo());
    }, []);

    return (
        <View >
            <Text >Prénom :</Text>
            <Text >{user?.firstname}</Text>

            <Text >Nom :</Text>
            <Text >{user?.lastname}</Text>

            <Text>Courriel :</Text>
            <Text >{user?.email}</Text>

            <Text >Adresse :</Text>
            <Text >{user?.address}</Text>

            <Text >Solde :</Text>
            <Text >{user?.balance +' €'}</Text>


            <Text>Mot de passe actuel</Text>
            <input id={"motDePasseActuel"}></input>
            <Text >Nouveau mot de passe</Text>
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
            <View>
                <BottomNavigationBar navigation={navigation}/>
            </View>
        </View>
    );
};

export default ProfileScreen;
