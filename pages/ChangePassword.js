import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { toaster } from 'evergreen-ui'
import {Button} from "react-native";
const ChangePassword = ({ navigation }) => {
    const queryParameters = new URLSearchParams(window.location.search)
    const token = queryParameters.get('token');


    const changePassword = async (password, confirmpassword) => {
        if (password !== confirmpassword) {
            toaster.warning('Les mots de passe ne correspondent pas');
        }else {

            axios.get(`http://localhost:8080/api/users/resetPassword?token=${token}&password=${password}`)
                .then((response) => {
                    console.log(response.data);
                    console.log(response);
                    navigation.replace('LogIn');
                }, (error) => {
                    toaster.warning("Erreur lors du changement de mot de passe");
                });

        }
    }


    return (
        <div>
            <h2>Changer le mot de passe</h2>
                <div>
                    <label>Nouveau mot de passe:</label>
                    <input
                        type="password"
                        id={"newPassword"}

                    />
                </div>
                <div>
                    <label>Confirmer le nouveau mot de passe:</label>
                    <input
                        type="password"
                        id={"confirmPassword"}
                    />
                </div>
                <button onClick={() => changePassword(document.getElementById("newPassword").value,document.getElementById("confirmPassword").value )} >Changer</button>
        </div>
    );
};

export default ChangePassword;
