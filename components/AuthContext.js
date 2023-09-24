// SelectedDishesContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from "axios";
import {toaster} from "evergreen-ui";
import {useDispatch, useSelector} from "react-redux";
import {loadUserInfo} from "../features/dishes/User";

const AuthContext = createContext();

export const useApplicationContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [userPassword, setUserPassword] = useState("")
    const [token, setToken] = useState("")

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    const tryLogIn = (email, password, firstname, lastname, navigation) => {
        if (email === undefined && password === undefined && firstname === undefined && lastname === undefined) {
            try {
                axios.get('http://localhost:8080/api/users/info')
                    .then((response) => {
                        setToken(response.headers['token']);  // Récupérez le cookie de l'en-tête Set-Cookie
                        navigation.replace('Carte');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        } else {
            axios.post('http://localhost:8080/api/users/login', {
                email: email,
                password: password
            })
                .then((response) => {
                    setToken(response.headers['token']);  // Récupérez le cookie de l'en-tête Set-Cookie
                    setUserPassword(password);
                    navigation.replace('Carte');
                })
                .catch((error) => {
                    toaster.warning(error.response.data);
                });
        }
    };


    const trySignIn = async (email, password, firstname, lastname) => {
        let response = false;
        await axios.post('http://localhost:8080/api/users/register', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }).then((response) => {
            toaster.success('Votre compte a bien été crée!')
            response = true
        }, (error) => {
            console.log(error)
            toaster.warning(error.response.data)
            response = false
        });
        return response
    }

    const sendPasswordResetEmail = (email) => {
        axios.get(`http://localhost:8080/api/users/resetPasswordMail?email=${email}`).then((response) => {
            console.log(response);
            toaster.success('Votre mdp a été changé, un email vous a été envoyé!')
        }, (error) => {
            console.log(error)
            toaster.warning(error.response.data)
        });
    }

    const resetPassword = (actualPassword, newPassword) => {
        if (actualPassword !== userPassword) {
            toaster.warning("Mot de passe incorrect")
        }else if (newPassword.length < 6){
            toaster.warning("Mot de passe trop court")
        }
        else{
            axios.get(`http://localhost:8080/api/users/resetPasswordAuthentificated?oldPassword=${actualPassword}&password=${newPassword}`, {
                email:user.email,
            }).then((response) => {
                console.log(response);
                toaster.success('Votre mot de passe a été modifié, un email vous a été envoyé!')
                dispatch(loadUserInfo());
            }, (error) => {
                console.log(error)
                toaster.warning(error.response.data)
            });
        }
    }

    const handleLogOut = (navigation) => {
        try {
            axios.post('http://localhost:8080/api/users/logout').then((response) => {
                dispatch(loadUserInfo());
                console.log(response.data)
                navigation.navigate('LogIn')
            })} catch (error) {
            console.log('ERREUR');
        }
    }

    const changePassword = async (password, confirmpassword, token) => {
        if (password !== confirmpassword) {
        }else{
            try {
                axios.get(`http://localhost:8080/api/users/resetPassword?token=${token}&password=${password}`)
                    .then((response) => {
                        toaster.success('votre mdp a été modifié!')
                    }, (error) => {
                        console.log(error)
                        toaster.warning(error.response.data)
                    });
            } catch (error) {
                console.log('ERREUR');
                console.error(error);
            }
        }

    }

    return (
        <AuthContext.Provider value={{ userPassword, tryLogIn, trySignIn, sendPasswordResetEmail, resetPassword, handleLogOut, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
