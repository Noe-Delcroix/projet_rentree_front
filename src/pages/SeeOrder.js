import React, {useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import axios from 'axios';

import { toaster } from 'evergreen-ui'
import {useApplicationContext} from "../components/AuthContext";
import Order from "../components/Order";
import {useDispatch, useSelector} from "react-redux";
import {loadOrders} from "../slices/Orders";
import BottomNavigationBar from "../components/BottomNavigationBar";
import FilterForm from "../components/FilterForm";
import SortingForm from "../components/SortingForm";

export default function SeeOrder({ navigation }) {

    const dispatch = useDispatch();
    const [sortType, setSortType] = useState("DATE");
    const [sortingOrders, setSortingOrders] = useState("ASC");

    const orders = useSelector(state => state.orders.value)

    useEffect(() => {
        dispatch(loadOrders());
    }, []);

    const handleSortingChange = ({ sortType, sortOrder }) => {
        setSortType(sortType);
        setSortingOrders(sortOrder);
        dispatch(loadOrders({ sortType, sortOrder }));  // Correction ici
    };

    return (
        <View>
            <SortingForm
                sortingMethods={{PRICE: "Prix",DATE: "date"}}
                sortType={sortType}
                sortOrder={sortingOrders}
                onSortingChange={handleSortingChange}
            />
            <Text>Commandes</Text>
            {orders.map((order) => {
                console.log(order)
              return (<Order orderId={order.id} />)
            })}
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>
    );
}