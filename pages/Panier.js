import React from 'react';
import {View, Text, Button, FlatList, Image, CheckBox, StyleSheet} from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {useApplicationContext} from "../components/ApplicationContext";
import axios from "axios";

export default function Panier({ navigation, route }) {

    const { dishes,  addDishes, removeDishes, token } = useApplicationContext();

    console.log(dishes);

    const launchOrder = async () => {
        const d = {}
        dishes.forEach(e => {
            if(e.quantity>0){
                d[e.id]=e.quantity
            }
        })

        try {
            axios.post('http://localhost:8080/api/orders', { orderContent: d }, {
            }).then((response) => {
                console.log(response.data);
                navigation.navigate('Order')
            });
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
        }
    }

    return (
        <View  style={styles.pageView}>
        <Text>Panier</Text>
        <Button
            title="Retourner au menu"
            onPress={() => navigation.navigate('Carte')}
        />
        <Button
            title="Payer"
            onPress={() => launchOrder()}
        />

        <FlatList
            data={dishes.filter(item => item.quantity > 0)}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Image
                source={{ uri: item.image }} // Assurez-vous que item.image contient l'URL de l'image
                style={{ width: 100, height: 100, marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text>{item.price}€</Text>
                    <Text>{item.description}</Text>
                    <Button onPress={() => addDishes(item.id, item.price, 1)} title={"+"}/><Button title={"-"} onPress={() => removeDishes(item.id, 1)}/><Text onPress={() => removeDishes(item.id)}>❌</Text>
                    <Text>quantity :{item.quantity}</Text>
                    
                </View>
            </View>
            )}
        />
            <View style={styles.bottomNavContainer}>
                <BottomNavigationBar navigation={navigation}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    bottomNavContainer: {
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
    },
    pageView: {
        height: '100%'
    },
    title: {
        fontWeight: 'bold',
    },
});
