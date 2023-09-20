import React, {useEffect, useState} from 'react';
import axios from 'axios';
const ChangePassword = ({ route }) => {

    const queryParameters = new URLSearchParams(window.location.search)
    const token =queryParameters.get('token');
    console.log(token);

    const changePassword = async (password, confirmpassword) => {
        if (password !== confirmpassword) {
        }else{
            try {
                axios.get(`http://localhost:8080/api/users/resetPassword?token=${token}&password=${password}`)
                    .then((response) => {
                        console.log(response.data);
                        console.log(response);
                    });
            } catch (error) {
                console.log('ERREUR');
                console.error(error);
            }
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
