import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Product from '../components/Product';
import axios from 'axios';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {useSelectedDishes} from "../components/selectedDishesContext";

export default function Carte({ navigation, route, token }) {
    const screenWidth = Dimensions.get('window').width;

    const { dishes, setDishes } = useSelectedDishes();

    const config = {
        headers: {
            token: token,
        },
    };

    const loadDishes = async () => {
        try {
            axios.get('http://localhost:8080/api/dishes', config).then((response) => {
                console.log(response.data);
                console.log(response);
                // ajouter un attribut quantity égale à 0 à chaque plat
                response.data.forEach((dish) => {
                    dish.quantity = 0;
                });
                setDishes(response.data);
            });
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
        }
    };

    useEffect(() => {
        loadDishes();
    }, []);

    const productContainerStyle =
        screenWidth < 600 ? styles.smallScreenContainer : styles.largeScreenContainer;
    const titleStyle = screenWidth < 600 ? styles.smallScreentitle : styles.largeScreentitle;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Text style={[styles.title, titleStyle]}>La Carte</Text>
                <View style={[styles.productContainer, productContainerStyle]}>
                    {dishes.map((dish) => {
                        return (
                            <Product
                                id={dish.id}
                                key={dish.id}
                                navigation={navigation}
                                name={dish.name}
                                image={dish.image}
                                description={dish.description}
                                allergenes={dish.allergenes}
                                price={dish.price}
                            />
                        );
                    })}
                </View>
                <View style={styles.bottomNavContainer}>
                    <BottomNavigationBar navigation={navigation}/>
                </View>
            </ScrollView>
        </View>
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
    title: {
        fontWeight: 'bold',
        fontSize: RFValue(30),
    },
    smallScreentitle: {
        marginBottom: RFPercentage(2),
    },
    largeScreentitle: {
        marginBottom: RFPercentage(0),
    },
    bottomNavContainer: {
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
    },
});
