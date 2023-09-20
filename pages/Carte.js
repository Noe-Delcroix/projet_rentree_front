import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Product from '../components/Product';
import axios from 'axios';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {useApplicationContext} from "../components/ApplicationContext";
import FilterForm from "../components/FilterForm";


export default function Carte({ navigation, route }) {

    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    const { dishes, setDishes } = useApplicationContext();

    const [tags, setTags] = useState({});
    const [diets, setDiets] = useState({});


    const loadDishes = async (query) => {
        console.log("Loading dishes with query :");
        console.log(query);

        try {

            axios.get('http://localhost:8080/api/dishes',{ params : query} ).then((response) => {
                console.log(response.data);
                setDishes(response.data);
            });
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
        }
    };


    useEffect(() => {
        axios.get('http://localhost:8080/api/dishes/tags').then((response) => {
            setTags(response.data);
        })
        axios.get('http://localhost:8080/api/dishes/diets').then((response) => {
            setDiets(response.data);
        })

    }, []);

    const productContainerStyle = (screenHeight > screenWidth && screenWidth < 600 && screenHeight < 1300) ? styles.smallScreenContainer : styles.largeScreenContainer;
    const titleStyle = (screenHeight > screenWidth && screenWidth < 600 && screenHeight < 1300) ? styles.smallScreentitle : styles.largeScreentitle;


    const handleQueryChange = (query) => {
        loadDishes(query);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>

                <Text style={[styles.title, titleStyle]}>La Carte</Text>
                <FilterForm
                    onQueryChange={handleQueryChange}
                    tags={tags}
                    diets={diets}
                    sortingMethods={{PRICE: "Prix",NAME: "Nom"}}
                    sortOrder='asc'
                />
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
        paddingHorizontal: 0,  
        columnGap: 10,
        marginHorizontal:0,
    },
    largeScreenContainer: {
        justifyContent: 'flex-start',
        columnGap: RFValue(20),
        paddingHorizontal: RFValue(10),        
        marginHorizontal:20,
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
