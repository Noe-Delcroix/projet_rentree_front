import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, Image, CheckBox, StyleSheet} from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {useApplicationContext} from "../components/AuthContext";
import axios from "axios";
import {TextInputField, toaster} from 'evergreen-ui';
import {useDispatch, useSelector} from "react-redux";
import {loadDishes} from "../features/dishes/Dishes";
import {loadDetailledBasket} from "../features/dishes/DetailledBasket";
import {addDishesToBasket, removeDishesFromBasket} from "../features/dishes/Basket";

export default function Panier({ navigation, route }) {

    const basket = useSelector(state => state.basket.value)
    const detailledBasket = useSelector(state => state.dishes.value)
    const dispatch = useDispatch();

    console.log("le panier :"+basket)
    const [address, setAddress] = useState("")

    const getQuantity = (id) => {
        const dish = basket.find((e) => e.id === id);
        if (dish) {
            return dish.quantity;
        }
        return 0;
    }

    const launchOrder = async () => {
        const d = {
            orderContent: {},
            address: address
        }
        console.log("address" + address)

        basket.forEach(e => {
            if(e.quantity>0){
                d.orderContent[e.id]=e.quantity
            }
        })


        try {
            axios.post('http://localhost:8080/api/orders', d, ).then((response) => {
                console.log(response.data);
                toaster.success('Votre commande a bien été envoyé')
                navigation.navigate('Order')
            });
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
            toaster.warning('Une erreur est survenue')
        }
    }

    useEffect(() => {
        dispatch(loadDetailledBasket(basket));

    }, []);

    return (
        <View  style={styles.pageView}>
        <Text>Panier</Text>
        <TextInputField
            id="address"
            label="A required text input field"
            required
            onChange={e => setAddress(e.target.value)}
            placeholder="Your address"
        />
        <Button
            title="Payer"
            onPress={() => launchOrder()}
        />

        <FlatList
            data={detailledBasket.filter(e => getQuantity(e.id)>0)}
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
                    <Button onPress={() => dispatch(addDishesToBasket({ dishId: item.id, quantity: 1 }))} title={"+"}/>
                    <Button title={"-"} onPress={() => dispatch(removeDishesFromBasket({ dishId: item.id, quantity: 1 }))}/>
                    <Button onPress={() => dispatch(removeDishesFromBasket({ dishId: item.id, quantity: 0 }))} title={"❌"}/>
                    <Text>quantity :{getQuantity(item.id)}</Text>
                    
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
