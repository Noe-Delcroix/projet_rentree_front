import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from "axios";
import BottomNavigationBar from "../components/BottomNavigationBar";

const ProfileScreen = ({ navigation, route, token }) => {
    const [user, setUser] = useState({})
    const dishes = route.params.dishes;
    const config = {
        headers: {
            token: token,
        },
    };

    console.log(route.params)

    const loadUserInfo = async () => {
        try {
            axios.get('http://localhost:8080/api/users/info', config).then((response) => {
                console.log(response.data)
                setUser(response.data);
            });
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
        }
    };

    useEffect(() => {
        loadUserInfo();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Prénom :</Text>
            <Text style={styles.text}>{user.firstname}</Text>

            <Text style={styles.label}>Nom :</Text>
            <Text style={styles.text}>{user.lastname}</Text>

            <Text style={styles.label}>Courriel :</Text>
            <Text style={styles.text}>{user.email}</Text>

            {/* Bouton pour modifier le mot de passe (non fonctionnel dans ce cas) */}
            <Button
                title="Modifier le mot de passe"
                onPress={() => {
                    // Vous pouvez ajouter ici la logique pour la modification du mot de passe
                }}
            />
            <View style={styles.bottomNavContainer}>
                <BottomNavigationBar navigation={navigation} articleNumber={dishes.length} selectedDishes={dishes}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        height: '100%'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 16,
    },
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    pageView: {
        height: '100%'
    }
});

export default ProfileScreen;
