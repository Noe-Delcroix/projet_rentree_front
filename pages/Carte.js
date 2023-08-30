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
                image: 'https://www.google.com/search?sca_esv=561284976&sxsrf=AB5stBiYjztn8Q7j12qmoCGDoA_nOb5-pA:1693394459016&q=pizza&tbm=isch&source=lnms&sa=X&ved=2ahUKEwiXzcb5oYSBAxWFQkEAHWjPA38Q0pQJegQIDhAB&biw=1482&bih=754&dpr=1.25#imgrc=-Me1Spx03VgNoM',
                description: "c'est une pizza lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                allergenes: "tomates, fruit, légumes"
            }
        ]
        setDishes(dishesTest)
    }

    useEffect(() => {
        loadDishes();
    }, []);
        
    return (
        <View>
            <Text>Carte</Text>
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
                    >
                    </Product>
        
                )
            })}
        </View>
    );
}