import React, {useEffect,} from 'react';
import {View, Text, Button, ScrollView, Image, Pressable} from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {loadUserInfo} from "../slices/User";
import PasswordInput from "../components/PasswordInput";

const ProfileScreen = ({ navigation, route }) => {
    const { resetPassword, handleLogOut, IsAnyUserLogedIn } = useApplicationContext();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);


    useEffect(() => {
        if (!IsAnyUserLogedIn()) {
            navigation.replace('Carte');
        }else{
            dispatch(loadUserInfo());
        }
    }, []);

    function seeActualPassword(){
        let password = document.getElementById("motDePasseActuel");
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }

    function seeNewPassword(){
        let password = document.getElementById("nouveauMotDePasse");
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }

    return (
        <View className="flex-1">
            <ScrollView>
                <View className="flex flex-col justify-start items-center">
                    <View className="w-full h-[100px]"></View>

                    <View className="flex flex-col items-center w-full md:w-1/2 bg-white shadow-xl p-8">
                        <View className="flex flex-col xl:flex-row w-full items-center justify-center mb-10">
                            <Image
                                source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}
                                className="hidden md:flex h-[200px] w-[200px] rounded-full"
                            />

                            <View className="p-5 flex-1">
                                <Text className="text-4xl">{user?.firstname} {user?.lastname}</Text>
                                <View className="w-full h-1 bg-[#713235] mb-3"></View>
                                <Text className="text-xl">Courriel : {user?.email}</Text>
                                <Text className="text-xl mb-3">Adresse : {user?.address}</Text>
                                <Text className="text-2xl text-[#713235] mb-5">Vous avez {user?.balance?.toFixed(2)}€ sur votre compte</Text>

                                <View className="flex flex-row flex-wrap justify-center items-center w-full">
                                    <Pressable
                                        className="mr-5 mb-5"
                                        onPress={() => {
                                            navigation.navigate('SeeOrder')
                                        }}>
                                        <Text className="text-xl uppercase bg-[#713235] text-white py-2 px-5 rounded shadow text-center">Historique de commandes</Text>
                                    </Pressable>
                                    <Pressable
                                        className="mr-5 mb-5"
                                        onPress={() => {
                                            handleLogOut(navigation)
                                        }}>
                                        <Text className="text-xl uppercase bg-[#713235] text-white py-2 px-5 rounded shadow text-center">Se déconnecter</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>


                        <View className="w-full md:w-2/3 flex flex-col items-center">
                            <View className="w-full mb-5">
                                <Text className="text-xl mb-2">Mot de passe actuel</Text>
                                <PasswordInput id={"motDePasseActuel"} />
                            </View>

                            <View className="w-full mb-10">
                                <Text className="text-xl mb-2">Nouveau mot de passe</Text>
                                <PasswordInput id={"motDePasseActuel"} />
                            </View>

                            <Pressable
                                className="w-full xl:w-1/2"
                                onPress={() => {
                                    resetPassword(
                                        document.getElementById("motDePasseActuel").value,
                                        document.getElementById("nouveauMotDePasse").value,
                                        user.email
                                    )
                                }}>
                                <Text className="text-xl uppercase bg-[#713235] text-white py-2 px-5 rounded shadow text-center">Modifier le mot de passe</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>
    );
};

export default ProfileScreen;
