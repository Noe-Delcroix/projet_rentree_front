import {Button, Picker, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Image } from 'react-native-web';
import React, {useState, useEffect} from "react";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {addDishesToBasket} from "../slices/Basket";
import {loadDish} from "../slices/Dish";
import Product from "../components/Product";
import {loadTags} from "../slices/Tags";
import {loadDiets} from "../slices/Diets";
import CustomButton from "../components/CustomButton";

export default function ObjectDetail({ route, navigation }) {
    const { id } = route.params;

    const dish = useSelector(state => state.dish.value);
    const tags = useSelector(state => state.tags.value)
    const diets = useSelector(state => state.diets.value)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect")
        dispatch(loadTags());
        dispatch(loadDiets());
        dispatch(loadDish(id));
        console.log(dish)
    }  , []);


    return (
        <View className="flex-1">
            <ScrollView>
                <View className="mx-5 xl:mx-48">
                    <Image
                        className="w-full h-[200px] md:h-[400px]"
                        source={{
                            uri: dish?.image,
                        }}
                    />

                    <View className="bg-white shadow-xl mt-10 p-10 flex flex-col items-center">

                        <Text className="text-4xl font-bold text-center">{dish?.name}</Text>
                        <Text className="text-3xl text-[#713235] font-bold mb-5">{dish?.price?.toFixed(2)}€</Text>

                        <Text className="text-xl text-[#713235] text-center">Régime : {diets[dish?.diet]}</Text>

                        <View className="flex flex-row flex-wrap justify-center items-center">
                            {dish?.tags?.map((tag) => {
                                return (
                                    <Text className="mr-3 shadow p-2 rounded my-1 bg-white text-xl">{tags[tag]}</Text>
                                );
                            })}
                        </View>



                        <View className="flex flex-col md:flex-row">
                            <View className="w-full md:w-1/2 p-3">
                                <Text className="text-3xl">Description</Text>
                                <View className="w-full h-1 bg-[#713235] mb-3"></View>
                                <Text className="text-xl">{dish?.description}</Text>
                            </View>
                            <View className="w-full md:w-1/2 p-3">
                                <Text className="text-3xl">Alergènes</Text>
                                <View className="w-full h-1 bg-[#713235] mb-3"></View>
                                <Text className="text-xl">{dish?.alergens}</Text>
                            </View>
                        </View>
                        <CustomButton text={"Ajouter au panier"} onPress={() => dispatch(addDishesToBasket({ dishId: id, quantity: 1 }))}/>
                    </View>


                </View>
            </ScrollView>
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>

    );
}