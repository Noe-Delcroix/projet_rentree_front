import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native';
import axios from "axios";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/AuthContext";

const WalletScreen = ({ navigation }) => {
    const [balance, setBalance] = useState(100); // Solde initial, vous pouvez ajuster selon vos besoins
    const [selectedAmount, setSelectedAmount] = useState(10); // Montant sélectionné par défaut
    const [user, setUser] = useState({})
    const { token } = useApplicationContext();

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
        <View>
            <View>
                <Text>Portefeuille de {user.firstName} :</Text>
                <Text>€{balance}</Text>

                <Text>Ajouter de l'argent :</Text>
                <Picker
                    selectedValue={selectedAmount}
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
                <View>
                    <BottomNavigationBar navigation={navigation}/>
                </View>
            </View>
        </View>

    );
};

export default WalletScreen;
