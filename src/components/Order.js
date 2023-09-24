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
        <View>
            <Text>Détail de la commande</Text>
            <Text>Numéro de commande : {orderId}</Text>
            <Text>Date : {order?.date}</Text>
            <Text>Prix total : {order?.totalPrice}€</Text>
            <Text>Adresse de livraison : {order?.address}</Text>
            {order?.orderContent && Object.entries(order?.orderContent).map(([key, quantity]) =>  {
                const dish = dishes.find((e) => e.id === parseInt(key));
                console.log(dishes)
               return(
                   <View>
                       <Image
                           source={{ uri: dish?.image }}
                       />
                       <View>
                           <Text>{dish.name}</Text>
                           <Text>{dish.price}€</Text>
                           <Text>{dish.description}</Text>
                           <Text>quantity :{quantity}</Text>
                       </View>
                   </View>
               )
            })}
        </View>
    );
}