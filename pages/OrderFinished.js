import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from "axios";
import {useApplicationContext} from "../components/ApplicationContext";

export default function OrderFinished({ route, navigation }) {
    const [solde, setSolde] = useState(0);

    const { token, dishes } = useApplicationContext();

    const soldeRestant = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/users/info', {
                headers: {
                    token: token,
                },
            });
            console.log(response.data);
            setSolde(response.data.balance);
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
        }

    };


    useEffect(() =>{
        soldeRestant().then(r => console.log(r));
    },[]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: 'https://i.guim.co.uk/img/media/88f6b98714035656cb18fb282507b60e82edb0d7/0_57_2560_1536/master/2560.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=74b1dd992e5428e4906b1e331a57a305',
                }}
            />
            <Text style={styles.title}>Commande validée !</Text>
            <Text style={styles.subtitle}>
                Elle vous attendra à la fin de vos rattrapages !
            </Text>
            <Text style={styles.solde}>
                Solde CROUS restant : {solde} €
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Couleur de fond
    },
    image: {
        width: 200, // Ajustez la largeur de l'image
        height: 150, // Ajustez la hauteur de l'image
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center', // Alignement du texte au
        solde: {
            fontSize: 20,
            color: 'green', // Couleur du solde
        },
    }});