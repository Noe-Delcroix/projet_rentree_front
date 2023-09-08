import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Product from '../components/Product';
import axios from 'axios';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {useApplicationContext} from "../components/ApplicationContext";
import FilterForm from "../components/FilterForm";


export default function Carte({ navigation, route }) {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const { dishes, setDishes, token } = useApplicationContext();



    const loadDishes = async (searchTerm) => {
        const config = {
            headers: {
                token: token,
            },
            body: {
                searchTerm: searchTerm,
            },
        };

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

    const productContainerStyle = (screenHeight > screenWidth && screenWidth < 600 && screenHeight) < 1500 ? styles.smallScreenContainer : styles.largeScreenContainer;
    const titleStyle = (screenHeight > screenWidth && screenWidth < 600 && screenHeight < 1500) ? styles.smallScreentitle : styles.largeScreentitle;


    const handleSearchQueryChange = (query) => {
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>

                <Text style={[styles.title, titleStyle]}>La Carte</Text>
                <FilterForm onSearchQueryChange={handleSearchQueryChange} />
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
                                alergens={dish.alergens}
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
        rowGap: 0,
    },
    smallScreenContainer: {
        justifyContent: 'space-between',    
    },
    largeScreenContainer: {
        justifyContent: 'flex-start',
        columnGap: RFValue(20),
        paddingHorizontal: RFValue(10),
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
