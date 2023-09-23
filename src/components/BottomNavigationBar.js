import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import wallet from '../../assets/wallet.png';
import {useApplicationContext} from "./ApplicationContext";

const BottomNavigationBar = ({ navigation, activeScreen }) => {
    const { numberOfDishes } = useApplicationContext();

    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Carte')}
            >
                <Image source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/chi-mai-network/list-182.png" }} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Panier')}
            >
                <Image source={{ uri: "https://cdn.icon-icons.com/icons2/2645/PNG/512/cart_icon_160298.png" }} />
                {numberOfDishes > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{numberOfDishes}</Text>
                    </View>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profil')}
            >
                <Image source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/8atour/people-23.png" }} />
            </TouchableOpacity>
        </View>
    );
};

export default BottomNavigationBar;
