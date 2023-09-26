import React from 'react';
import {Button, Text, View} from 'react-native';
import CustomButton from "../components/CustomButton";

export default function Error({ navigation }) {



    return (
        <View className="flex-1 justify-center items-center">
            <View className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center bg-white shadow-xl">
                <Text className="text-5xl font-bold text-center">Une erreur est survenue</Text>
                <View className="mt-10">
                    <CustomButton text={"Retour à la page principale"} onPress={() => navigation.replace('Carte')}/>
                </View>


            </View>
        </View>
    );
}

