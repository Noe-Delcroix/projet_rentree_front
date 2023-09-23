import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
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

    const handleQueryChange = (query) => {
        loadDishes(query);
    };

    return (
        <View>
            <ScrollView>

                <Text>La Carte</Text>
                <FilterForm
                    onQueryChange={handleQueryChange}
                    tags={tags}
                    diets={diets}
                    sortingMethods={{PRICE: "Prix",NAME: "Nom"}}
                    sortOrder='asc'
                />
                <View>
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
                <View>
                    <BottomNavigationBar navigation={navigation}/>
                </View>
            </ScrollView>
        </View>
    );
}