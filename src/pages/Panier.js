import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, Image, CheckBox, ScrollView, TextInput} from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/AuthContext";
import axios from "axios";
import {TextInputField, toaster} from 'evergreen-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from "react-redux";
import {loadDishes} from "../slices/Dishes";
import {loadDetailledBasket} from "../slices/DetailledBasket";
import {addDishesToBasket, removeDishesFromBasket} from "../slices/Basket";

export default function Panier({ navigation, route }) {

    const basket = useSelector(state => state.basket.value)
    const detailledBasket = useSelector(state => state.dishes.value)
    const dispatch = useDispatch();

    console.log("le panier :"+basket)
    const [address, setAddress] = useState("")


    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        dispatch(loadDetailledBasket(basket));

    }, []);

    const getQuantity = (id) => {
        const dish = basket.find((e) => e.id === id);
        if (dish) {
            return dish.quantity;
        }
        return 0;
    }

    const launchOrder = async () => {
        const d = {
            orderContent: {},
            address: address
        }
        console.log("address" + address)

        basket.forEach(e => {
            if(e.quantity>0){
                d.orderContent[e.id]=e.quantity
            }
        })


        try {
            axios.post('http://localhost:8080/api/orders', d, ).then((response) => {
                console.log(response.data);
                toaster.success('Votre commande a bien été envoyé')
                navigation.navigate('Order')
            });
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
            toaster.warning('Une erreur est survenue')
        }
    }

    return (
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
                                        secureTextEntry={true}
                                        placeholder="Adresse de livraison"
                                        onChangeText={setAddress}
                                    />
                                    <View className="mt-5">
                                        <Button
                                            color={'#713235'}

                                            className="text-white p-2 rounded"
                                            title="Payer"
                                            onPress={() => launchOrder()}
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
                                                        <Text className="text-2xl mx-5">{getQuantity(item.id)}</Text>
                                                        <Button title={"+"} color="#713235"  onPress={() => dispatch(addDishesToBasket({ dishId: item.id, quantity: 1 }))}/>
                                                    </View>
                                                </View>

                                                <View className="flex flex-row items-center justify-between w-full mb-5">
                                                    <Text className="text-xl">Total : { (item.price*getQuantity(item.id)).toFixed(2) }€</Text>
                                                    <Icon name="trash" size={30} color="#713235" onPress={() => dispatch(removeDishesFromBasket({ dishId: item.id, quantity: 0 }))}/>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>



                    </View>
                </View>
            </ScrollView>
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>
    );
}
