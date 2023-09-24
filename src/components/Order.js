import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useApplicationContext} from "./AuthContext";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loadDish} from "../slices/Dish";
import {fetchOrderById} from "../slices/Orders";
import {loadDishes} from "../slices/Dishes";



export default function Order({ orderId }) {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("order id :"+orderId)
        dispatch(loadDishes())
        dispatch(fetchOrderById(orderId));
    }  , []);
    const dishes = useSelector(state => state.dishes.value)
    const order = useSelector(state => state.orders.orderDetails);

    return (
        <View className="my-3 shadow-xl p-5 bg-white">
            <Text className="text-2xl font-bold">Commande n°{orderId}</Text>
            <Text className="text-xl">Passée le { new Date(order?.date).toLocaleDateString() }</Text>
            <Text className="text-xl">Adresse de livraison : {order?.address}</Text>
            <Text className="text-xl text-[#713235] font-bold">Prix total : {order?.totalPrice}€</Text>

            {order?.orderContent && Object.entries(order?.orderContent).map(([key, quantity]) =>  {
                const dish = dishes.find((e) => e.id === parseInt(key));
                console.log(dishes)
               return(
                   <View>
                       <Image
                           source={{ uri: dish?.image }}
                       />
                       <View>
                           <Text>{dish?.name}</Text>
                           <Text>{dish?.price}€</Text>
                           <Text>quantity :{quantity}</Text>
                       </View>
                   </View>
               )
            })}
        </View>
    );
}