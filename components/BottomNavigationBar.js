import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import wallet from '../assets/wallet.png';
import {useApplicationContext} from "./ApplicationContext";

const BottomNavigationBar = ({ navigation, activeScreen }) => {
    const { numberOfDishes } = useApplicationContext();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Carte')}
                style={[styles.tab, activeScreen === 'Screen1' && styles.activeTab]}
            >
                <Image source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/chi-mai-network/list-182.png" }} style={styles.tabImage} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Panier')}
                style={[styles.tab, activeScreen === 'Screen1' && styles.activeTab]}
            >
                <Image source={{ uri: "https://cdn.icon-icons.com/icons2/2645/PNG/512/cart_icon_160298.png" }} style={styles.tabImage} />
                {numberOfDishes > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{numberOfDishes}</Text>
                    </View>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profil')}
                style={[styles.tab, activeScreen === 'Screen1' && styles.activeTab]}
            >
                <Image source={{ uri: "https://icons.veryicon.com/png/o/miscellaneous/8atour/people-23.png" }} style={styles.tabImage} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'sticky',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff', // Couleur de fond de la barre
        borderTopWidth: 1,
        borderTopColor: '#ccc', // Couleur de la bordure supérieure
        height: 60, // Hauteur de la barre
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        position: 'relative', // Permet de positionner le badge
    },
    activeTab: {
        borderBottomWidth: 2, // Ajoute une indication visuelle pour l'onglet actif
        borderBottomColor: 'blue', // Couleur de l'indication pour l'onglet actif
    },
    tabImage: {
        width: 24, // Définissez la largeur souhaitée
        height: 24, // Définissez la hauteur souhaitée
        resizeMode: 'contain', // Assurez-vous que l'image est bien ajustée
    },
    badge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red', // Couleur du badge
        borderRadius: 10, // Pour arrondir le badge
        paddingHorizontal: 5, // Espacement horizontal du texte dans le badge
    },
    badgeText: {
        color: 'white', // Couleur du texte du badge
        fontSize: 12, // Taille du texte du badge
    },
    tabText: {
        fontSize: 16,
    },
});

export default BottomNavigationBar;
