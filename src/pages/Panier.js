import React, { useState} from 'react';
import {View, Text, Button, ScrollView, TextInput} from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {
    selectTotalPrice,
    loadDetailledBasket,
} from "../slices/Basket";
import {useFocusEffect} from "@react-navigation/native";
import {addOrder} from "../slices/Orders";
import {useApplicationContext} from "../components/AuthContext";
import BasketDish from "../components/BasketDish";
import {toaster} from "evergreen-ui";

export default function Panier({ navigation }) {

    const basket = useSelector(state => state.basket.basket)
    const detailledBasket = useSelector(state => state.basket.detailledBasket)

    const dispatch = useDispatch();
    const [address, setAddress] = useState("")
    const totalPrice = useSelector(selectTotalPrice);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(loadDetailledBasket());
            return () => {};
        }, [dispatch])
    );
  
    const { IsAnyUserLogedIn } = useApplicationContext();

    const launchOrder = async () => {
        if (!IsAnyUserLogedIn()) {
            navigation.navigate('LogIn');
        }else{
            dispatch(addOrder({ address, basket })).then((result) => {
                if (result.payload !== "error") {
                    navigation.replace('Order');
                }
            });
        }
    }

    return (

        basket.length === 0 ? (
            <View className="flex-1 justify-center items-center">
                <View className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center bg-white shadow-xl">
                    <Text className="text-3xl text-center mb-2">Votre panier est vide</Text>
                    <View className="mt-5 w-full md:w-1/3">
                        <Button title={"Retour à la carte"} color="#713235" onPress={() => navigation.replace('Carte')}/>
                    </View>
                </View>
            </View>
        ):(
                <View className="flex-1">
                    <ScrollView>
                        <View className="mx-5 xl:mx-20 mt-10">
                            <Text className="text-4xl text-center mb-2">Votre panier</Text>
                            <View className="w-full h-1 bg-[#713235] mb-5"></View>
                            <View className="flex flex-col lg:flex-row-reverse">
                                <View className="w-full lg:w-1/3">
                                    <View className="m-10">
                                        <View className="bg-white shadow-xl p-5">
                                            <Text className="text-3xl mb-2">Votre commande</Text>
                                            <View className="w-full h-1 bg-[#713235] mb-5"></View>

                                            <Text className="text-2xl text-[#713235] font-bold mb-5">
                                                Prix total : {totalPrice.toFixed(2)}€
                                            </Text>

                                            <TextInput
                                                className="mb-2 p-2 border border-[#713235] rounded"
                                                placeholder="Adresse de livraison"
                                                onChangeText={setAddress}
                                            />
                                            <View className="mt-5">
                                                <Button title={"Passer la commande"} color="#713235" onPress={() => launchOrder()}/>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View className="w-full lg:w-2/3">
                                    <View className="m-10">
                                        {
                                            detailledBasket.map((item) => (
                                                <BasketDish item={item} key={item.id} />
                                            ))
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
                </View>
            )
    );
}
