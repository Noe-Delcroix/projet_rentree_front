import React, { useState} from 'react';
import {View, Text, Button, FlatList, Image, CheckBox, ScrollView, TextInput} from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from "react-redux";
import {
    addDishesToBasket,
    removeDishesFromBasket,
    selectTotalPrice,
    loadDetailledBasket,
    viderPanier
} from "../slices/Basket";
import {useFocusEffect} from "@react-navigation/native";
import {addOrder} from "../slices/Orders";
import {useApplicationContext} from "../components/AuthContext";

export default function Panier({ navigation, route }) {

    const basket = useSelector(state => state.basket.basket)
    const detailledBasket = useSelector(state => state.basket.detailledBasket)

    const dispatch = useDispatch();
    const [address, setAddress] = useState("")
    const totalPrice = useSelector(selectTotalPrice);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(loadDetailledBasket());
            console.log("basket :"+basket)
            // Retournez une fonction de nettoyage si nécessaire
            return () => {};
        }, [dispatch])  // spécifiez les dépendances pour éviter des appels excessifs
    );
  
    const { IsAnyUserLogedIn } = useApplicationContext();

    const launchOrder = async () => {
        if (!IsAnyUserLogedIn()) {
            navigation.navigate('LogIn');
        }else{
            dispatch(addOrder({ address, basket }))
            dispatch(viderPanier())
        }
    }

    console.log("basket :",basket.length)

    return (
        <View className="flex-1">
            <ScrollView>
                <View className="mx-5 xl:mx-20 mt-10">
                    <Text className="text-4xl text-center mb-2">Votre panier</Text>
                    <View className="w-full h-1 bg-[#713235] mb-5"></View>
                    {basket.length === 0 ? (
                        <View>

                            <Text className="text-3xl text-center mb-2">Votre panier est vide</Text>
                            <View className="mt-5">
                                <Button
                                    color={'#713235'}

                                    className="text-white p-2 rounded"
                                    title="Retour à la carte"
                                    onPress={() => navigation.replace('Carte')}
                                />
                            </View>
                        </View>
                    ) : (
                    <View className="flex flex-col lg:flex-row-reverse">


                        <View className="w-full lg:w-1/3">
                            <View className="m-10">
                                <View className="bg-white shadow-xl p-5">
                                    <Text className="text-3xl mb-2">Votre commande</Text>
                                    <View className="w-full h-1 bg-[#713235] mb-5"></View>

                                    <Text className="text-2xl text-[#713235] font-bold mb-5">
                                        Prix total : {totalPrice}€
                                    </Text>


                                    <TextInput
                                        className="mb-2 p-2 border border-[#713235] rounded"
                                        placeholder="Adresse de livraison"
                                        onChangeText={setAddress}
                                    />
                                    <View className="mt-5">
                                        <Button
                                            color={'#713235'}

                                            className="text-white p-2 rounded"
                                            title="Payer"
                                            onPress={launchOrder}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View className="w-full lg:w-2/3">
                            <View className="m-10">
                                {
                                    detailledBasket.map((item) => (
                                        <View className="flex flex-col md:flex-row justify-start bg-white mb-10 shadow-xl">
                                            <Image
                                                source={{ uri: item.image }}
                                                className="w-full h-[200px] md:h-full md:w-[200px]"
                                            />
                                            <View className="m-5 flex-1">
                                                <View className="flex flex-row items-center justify-between w-full mb-5">
                                                    <Text className="text-3xl">{item.name}</Text>
                                                    <Text className="text-2xl text-[#713235] font-bold">{item.price.toFixed(2)}€</Text>
                                                </View>

                                                <View className="flex flex-row items-center mb-5">
                                                    <View className="flex flex-row items-center">
                                                        <Button title={"-"} color="#713235" onPress={() => dispatch(removeDishesFromBasket({ dishId: item.id, quantity: 1 }))}/>
                                                        <Text className="text-2xl mx-5">{basket.find((element) => element.id === item.id).quantity}</Text>
                                                        <Button title={"+"} color="#713235"  onPress={() => dispatch(addDishesToBasket({ dishId: item.id, quantity: 1 }))}/>
                                                    </View>
                                                </View>

                                                <View className="flex flex-row items-center justify-between w-full mb-5">
                                                    <Text className="text-xl">Total : { (item.price*basket.find((element) => element.id === item.id).quantity).toFixed(2) }€</Text>
                                                    <Icon name="trash" size={30} color="#713235" onPress={() => dispatch(removeDishesFromBasket({ dishId: item.id, quantity: 0 }))}/>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>



                    </View>)}
                </View>
            </ScrollView>
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>
    );
}
