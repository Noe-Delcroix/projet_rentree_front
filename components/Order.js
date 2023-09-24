import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Button, Image} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Card } from '@rneui/themed';
import {useApplicationContext} from "./AuthContext";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loadDish} from "../features/dishes/Dish";
import {loadOrderInfo} from "../features/dishes/Order";



export default function Order({ orderId }) {

    const { dishes } = useApplicationContext();

    const [orderContent, setOrderContent] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [date, setDate] = useState("");
    const [adress, setAdress] = useState("");

    const dispatch = useDispatch();

    const order = useSelector(state => state.order.value);

    useEffect(() => {
        console.log("useEffect")
        dispatch(loadOrderInfo(orderId));
    }  , []);

    const getOrderDetails = async () => {
        try {
            axios.get(`http://localhost:8080/api/orders/${orderId}`, ).then((response) => {
                    console.log(response.data);
                    setOrderContent(response.data.orderContent)
                    setTotalPrice(response.data.totalPrice)
                    setDate(response.data.date)
                    setAdress(response.data.adress)
                });
            } catch (error) {
        }
    }

    return (
        <View>
            <Text>Détail de la commande</Text>
            <Text>Numéro de commande : {orderId}</Text>
            <Text>Date : {date}</Text>
            <Text>Prix total : {totalPrice}€</Text>
            <Text>Adresse de livraison : {adress}</Text>
            {Object.entries(orderContent).map((([key, quantity]) => {
                const dish = dishes.find((e) => e.id === parseInt(key));
               return(
                   <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                       <Image
                           source={{ uri: dish.image }} // Assurez-vous que item.image contient l'URL de l'image
                           style={{ width: 100, height: 100, marginRight: 10 }}
                       />
                       <View style={{ flex: 1 }}>
                           <Text>{dish.name}</Text>
                           <Text>{dish.price}€</Text>
                           <Text>{dish.description}</Text>
                           <Text>quantity :{quantity}</Text>

                       </View>
                   </View>
               )
            }))}
        </View>
    );
}