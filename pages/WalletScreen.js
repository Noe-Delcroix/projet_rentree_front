import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native';
import axios from "axios";
import BottomNavigationBar from "../components/BottomNavigationBar";

const WalletScreen = ({ navigation, route, token, articleNumber }) => {
    const [balance, setBalance] = useState(100); // Solde initial, vous pouvez ajuster selon vos besoins
    const [selectedAmount, setSelectedAmount] = useState(10); // Montant sélectionné par défaut
    const dishes = route.params.dishes;
    const [user, setUser] = useState({})

    const config = {
        headers: {
            token: token,
        },
    };

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

    const handleAddMoney = () => {
        // Vous pouvez ajouter ici la logique pour ajouter le montant sélectionné au solde du portefeuille
        setBalance(balance + parseInt(selectedAmount));
    };

    return (
        <View style={styles.pageView}>
            <View style={styles.container}>
                <Text style={styles.label}>Portefeuille de {user.firstName} :</Text>
                <Text style={styles.balance}>€{balance}</Text>

                <Text style={styles.label}>Ajouter de l'argent :</Text>
                <Picker
                    selectedValue={selectedAmount}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedAmount(itemValue)}
                >
                    <Picker.Item label="€10" value={10} />
                    <Picker.Item label="€20" value={20} />
                    <Picker.Item label="€50" value={50} />
                    {/* Vous pouvez ajouter d'autres montants au besoin */}
                </Picker>

                <Button
                    title="Ajouter de l'argent"
                    onPress={handleAddMoney}
                />
                <View style={styles.bottomNavContainer}>
                    <BottomNavigationBar navigation={navigation}/>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    pageView: {
        height: '100%'
    },
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
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
    balance: {
        fontSize: 20,
        marginBottom: 16,
    },
    picker: {
        height: 40,
        marginBottom: 16,
    },
});

export default WalletScreen;
