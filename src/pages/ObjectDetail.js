import {Button, Picker, StyleSheet, Text, View} from 'react-native';
import { Image } from 'react-native-web';
import React, {useState, useEffect} from "react";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {addDishesToBasket} from "../slices/Basket";
import {loadDish} from "../slices/Dish";

export default function ObjectDetail({ route, navigation }) {
    const { id } = route.params;

    // Ajoutez un state pour gérer la quantité de plats
    const [quantity, setQuantity] = useState(1);

    const dish = useSelector(state => state.dish.value);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect")
        dispatch(loadDish(id));
    }  , []);


    return (
        <View>
            <View>
                <Image
                    source={{
                        uri: dish?.image,
                    }}
                />
            </View>
            <View>
                <Text>{dish?.title}</Text>
                <Text>{dish?.price} €</Text>
                <Picker
                    selectedValue={quantity}
                    onValueChange={(itemValue, itemIndex) => setQuantity(itemValue)}
                >
                    <Picker.Item label="1" value={1} />
                    <Picker.Item label="2" value={2} />
                    <Picker.Item label="3" value={3} />
                    <Picker.Item label="4" value={4} />
                    <Picker.Item label="5" value={5} />
                    <Picker.Item label="6" value={6} />
                    <Picker.Item label="7" value={7} />
                </Picker>
                <Button title={'ajouter au panier'} onPress={() => dispatch(addDishesToBasket({ dishId: id, quantity: quantity }))} />
            </View>

            <View>
                <View>
                    <Text>Description</Text>
                    <Text>{dish?.description}</Text>
                </View>
                <View></View>
                <View>
                    <Text>Allergènes</Text>
                    <Text>{dish?.alergens}</Text>
                </View>
            </View>
            <View>
                <BottomNavigationBar navigation={navigation}/>
            </View>

        </View>
    );
}