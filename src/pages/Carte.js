import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import Product from '../components/Product';
import axios from 'axios';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {useApplicationContext} from "../components/ApplicationContext";
import FilterForm from "../components/FilterForm";
import {useDispatch, useSelector} from 'react-redux';
import { loadDishes} from '../slices/Dishes';

export default function Carte({ navigation }) {

    const dispatch = useDispatch();
    const dishes = useSelector(state => state.dishes.value)
    const [tags, setTags] = useState({});
    const [diets, setDiets] = useState({});



    useEffect(() => {
        axios.get('http://localhost:8080/api/dishes/tags').then((response) => {
            setTags(response.data);
        })
        axios.get('http://localhost:8080/api/dishes/diets').then((response) => {
            setDiets(response.data);
        })

    }, []);

    const handleQueryChange = (query) => {
        dispatch(loadDishes(query));
    };

    return (
        <View className="flex-1">
            <ScrollView>
                <View className="mx-5 xl:mx-20">
                    <FilterForm
                        onQueryChange={handleQueryChange}
                        tags={tags}
                        diets={diets}
                        sortingMethods={{PRICE: "Prix",NAME: "Nom"}}
                        sortOrder='asc'
                    />
                    <View className="flex flex-row flex-wrap w-full items-stretch">
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
                </View>
            </ScrollView>
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>
    );
}