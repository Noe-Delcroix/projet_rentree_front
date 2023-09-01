import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Product from '../components/Product';
import axios from 'axios';

export default function Carte({ navigation }) {

    const [dishes, setDishes] = useState([])
    const screenWidth = Dimensions.get('window').width;

    const loadDishes = async () => {
        try {
            axios.post('http://localhost:8080/api/dishes').then((response) => {
                console.log(response.data);
                console.log(response);
                setDishes(response.data)
              });
        } catch (error) {
            console.log('ERREUR')
            console.error(error);
        }
        /*const dishesTest = [
            {
                title: "Pizza",
                image: 'https://images.ctfassets.net/nw5k25xfqsik/64VwvKFqxMWQORE10Tn8pY/200c0538099dc4d1cf62fd07ce59c2af/20220211142754-margherita-9920.jpg?w=1024',
                description: "c'est une pizza lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                allergenes: "tomates, fruit, légumes",
                price: 10
            }
        ]
        setDishes(dishesTest)*/
    }

    useEffect(() => {
        loadDishes();
    }, []);

    const productContainerStyle = screenWidth < 600 ? styles.smallScreenContainer : styles.largeScreenContainer;
    const titleStyle = screenWidth < 600 ? styles.smallScreentitle : styles.largeScreentitle;


    return (
        <ScrollView>
            <Text style={[styles.title, titleStyle]}>
                La Carte
            </Text>
            <View style={[styles.productContainer, productContainerStyle]}>
            {dishes.map(dish => {
                return(
                    <Product 
                    key={dish.name}
                    navigation={navigation}
                    name={dish.name}
                    image={dish.image}
                    description={dish.description}
                    allergenes={dish.allergenes}
                    price={dish.price}
                    />        
                )
            })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap',    
        paddingHorizontal: RFValue(10), 
        rowGap: 0, 
    },
    smallScreenContainer: {
        justifyContent: 'space-between', 
    },
    largeScreenContainer: {
        justifyContent: 'flex-start',   
        columnGap: RFValue(20),  
    },
    title:{
        fontWeight: 'bold',
        fontSize: RFValue(30),
    },
    smallScreentitle:{
        marginBottom: RFPercentage(2),
    },
    largeScreentitle:{
        marginBottom: RFPercentage(0),
    }
});