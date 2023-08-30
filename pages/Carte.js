import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Product from '../components/Product';
import axios from 'axios';

export default function Carte({ navigation }) {

    const [dishes, setDishes] = useState([])

    const loadDishes = async () => {
        /*
        try {
            const response = await axios.get('mettre le lien de l api');
            console.log(response);
            setDishes(response.data)
        } catch (error) {
        console.error(error);
        }*/
        const dishesTest = [
            {
                title: "Pizza",
                image: 'https://images.ctfassets.net/nw5k25xfqsik/64VwvKFqxMWQORE10Tn8pY/200c0538099dc4d1cf62fd07ce59c2af/20220211142754-margherita-9920.jpg?w=1024',
                description: "c'est une pizza lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                allergenes: "tomates, fruit, légumes",
                price: 10
            }
        ]
        setDishes(dishesTest)
    }

    useEffect(() => {
        loadDishes();
    }, []);
        
    return (
        <View>
            <Button
                title="Panier"
                onPress={() =>
                    navigation.navigate('Panier')
                }
            />
            {dishes.map(dish => {
                return(
                    <Product navigation={navigation} 
                    title={dish.title}
                    image={dish.image}
                    description={dish.description}
                    allergenes={dish.allergenes}
                    price={dish.price}
                    >
                    </Product>
        
                )
            })}
        </View>
    );
}