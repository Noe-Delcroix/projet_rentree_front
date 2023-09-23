import React, {useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import axios from 'axios';
import Order from "../components/Order";

export default function SeeOrder({ navigation }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:8080/api/orders?sortingMethod=&sortingOrder=', ).then((response) => {
                setOrders(response.data)
            });
        } catch (error) {
        }
    }, []);



    return (
        <View>
            <Text>Commandes</Text>
            {orders.map((order) => {
              return (<Order orderId={order.id} />)
            })}
        </View>
    );
}