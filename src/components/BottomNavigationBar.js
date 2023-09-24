import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import {useApplicationContext} from "./ApplicationContext";
import {useSelector} from "react-redux";

const BottomNavigationBar = ({ navigation, activeScreen }) => {
    const basket = useSelector(state => state.basket.value)

    return (
        <View className="flex flex-row justify-around items-center h-[60px] bg-[#FDF7EF]">
            <TouchableOpacity
                onPress={() => navigation.navigate('Carte')}
                className={`w-1/3 h-full flex flex-col items-center justify-center ${activeScreen === 'Carte' ? 'text-white' : 'text-gray-400'}`}
            >
                <Image
                    className="w-8 h-8"
                    source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/chi-mai-network/list-182.png" }} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Panier')}
                className={`w-1/3 h-full flex flex-col items-center justify-center ${activeScreen === 'Panier' ? 'text-white' : 'text-gray-400'}`}
            >
                <View>
                    <Image
                        className="w-8 h-8"
                        source={{ uri: "https://cdn.icon-icons.com/icons2/2645/PNG/512/cart_icon_160298.png" }} />
                    {basket.length > 0 && (
                        <View className="absolute top-[-10px] right-[-10px] bg-red-600 px-[5px] rounded-full">
                            <Text className="text-white font-extrabold">{basket.length}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Profil')}
                className={`w-1/3 h-full flex flex-col items-center justify-center ${activeScreen === 'Profil' ? 'text-white' : 'text-gray-400'}`}
            >
                <Image
                    className="w-8 h-8"
                    source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/8atour/people-23.png" }} />
            </TouchableOpacity>
        </View>
    );
};

export default BottomNavigationBar;
