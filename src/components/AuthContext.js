// SelectedDishesContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {toaster} from "evergreen-ui";
import {useDispatch, useSelector} from "react-redux";
import {loadUserInfo} from "../slices/User";

const AuthContext = createContext();

export const useApplicationContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children, navigation}) => {
    const [userPassword, setUserPassword] = useState("")
    const [token, setToken] = useState("")

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    useEffect(() => {
        tryLogIn(undefined, undefined, navigation)
    });

    const tryLogIn = async (email, password, navigation) => {
        if (email === undefined && password === undefined) {
            try {
                await axios.get('http://localhost:8080/api/users/info')
                    .then((response) => {
                        setToken(response.headers['token']);  // Récupérez le cookie de l'en-tête Set-Cookie
                        setUserPassword(response.data.password);
                        if (navigation !== undefined) navigation.replace('Carte');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        } else {
            await axios.post('http://localhost:8080/api/users/login', {
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

    const IsAnyUserLogedIn = () => {
        return userPassword !== "";
    }


    const trySignIn = async (email, password, firstname, lastname, address) => {
        let ret = false;
        await axios.post('http://localhost:8080/api/users/register', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            address: address
        }).then((response) => {
            ret = true
            toaster.success('Votre compte a bien été crée!')

        }, (error) => {
            console.log(error)
            ret = false
            toaster.warning(error.response.data)
        });
        return ret
    }

    const sendPasswordResetEmail = (email) => {
        axios.get(`http://localhost:8080/api/users/resetPasswordMail?email=${email}`).then((response) => {
            console.log(response);
            toaster.success('Votre mot de passe a été changé, un email vous a été envoyé!')
        }, (error) => {
            console.log(error)
            toaster.warning(error.response.data)
        });
    }

    const resetPassword = (actualPassword, newPassword) => {
        if (newPassword.length < 6){
            toaster.warning("Mot de passe trop court")
            return
        }
        axios.post(`http://localhost:8080/api/users/verifyPassword?password=${actualPassword}`).then((response) => {
            console.log(response.data);
            if (response.data === true) {

                axios.get(`http://localhost:8080/api/users/resetPasswordAuthentificated?oldPassword=${actualPassword}&password=${newPassword}`, {
                    email: user.email,
                }).then((response) => {
                    console.log(response);
                    toaster.success('Votre mot de passe a été modifié, un email vous a été envoyé!')
                    dispatch(loadUserInfo());
                }, (error) => {
                    console.log(error)
                    toaster.warning(error.response.data)
                });
            }

        }, (error) => {
            console.log(error)
            toaster.warning(error.response.data)
        })
    }

    const handleLogOut = (navigation) => {
        try {
            axios.post('http://localhost:8080/api/users/logout').then((response) => {
                dispatch(loadUserInfo());
                setUserPassword("");
                console.log(response.data)
                toaster.success('Vous avez été déconnecté!')
                navigation.navigate('Carte')

            })
        } catch (error) {
            toaster.danger(error.response.data)
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
        <AuthContext.Provider value={{ userPassword, tryLogIn, trySignIn, IsAnyUserLogedIn, sendPasswordResetEmail, resetPassword, handleLogOut, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
