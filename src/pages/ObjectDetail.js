import {Button, Picker, StyleSheet, Text, View} from 'react-native';
import { Image } from 'react-native-web';
import React, {useState} from "react";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/ApplicationContext";

export default function ObjectDetail({ route, navigation }) {
    const { id, title, image, description, alergens, price } = route.params;

    // Ajoutez un state pour gérer la quantité de plats
    const [quantity, setQuantity] = useState(1);

    const { addDishesToBasket } = useApplicationContext();


    return (
        <View>
            <View>
                <Image
                    source={{
                        uri: image,
                    }}
                />
            </View>
            <View>
                <Text>{title}</Text>
                <Text>{price} €</Text>
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
                <Button title={'ajouter au panier'} onPress={() => addDishesToBasket(id, quantity)} />
            </View>

            <View>
                <View>
                    <Text>Description</Text>
                    <Text>{description}</Text>
                </View>
                <View></View>
                <View>
                    <Text>Allergènes</Text>
                    <Text>{alergens}</Text>
                </View>
            </View>
            <View>
                <BottomNavigationBar navigation={navigation}/>
            </View>

        </View>
    );
}