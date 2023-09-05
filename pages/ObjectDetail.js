import { StatusBar } from 'expo-status-bar';
import {Button, Picker, StyleSheet, Text, View} from 'react-native';
import Product from '../components/Product';
import { Image } from 'react-native-web';
import { CheckBox } from '@rneui/base';
import {Select} from "evergreen-ui";
import React, {useState} from "react";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useSelectedDishes} from "../components/selectedDishesContext";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    fullwidthImage: {
        width: '100%',
        aspectRatio: 1,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
    price: {
        fontSize: 18,
        color: 'green',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    allergenes: {
        fontSize: 16,
    },
    divider: {
        width: 1,
        height: '100%',
        marginHorizontal: 10,
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfContainer: {
        flex: 1,
    },
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default function ObjectDetail({ route, navigation }) {
    const { id, title, image, description, allergenes, price } = route.params;

    // Ajoutez un state pour gérer la quantité de plats
    const [quantity, setQuantity] = useState(1);

    const { dishes, numberOfDishes, addDishes, removeDishes } = useSelectedDishes();


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.fullwidthImage}
                    source={{
                        uri: image,
                    }}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{price} €</Text>
                <Picker // Utilisez le Picker pour la quantité
                    selectedValue={quantity}
                    onValueChange={(itemValue, itemIndex) => setQuantity(itemValue)}
                >
                    <Picker.Item label="1" value={1} />
                    <Picker.Item label="2" value={2} />
                    <Picker.Item label="3" value={3} />
                    {/* Ajoutez plus d'options au besoin */}
                </Picker>
                <Button title={'Ajouter au panier'} onPress={() => addDishes(id, price, quantity)} />
                <Button title={'Retirer du panier'} onPress={() => removeDishes(id)} />
            </View>

            <View style={styles.columnContainer}>
                <View style={styles.halfContainer}>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.halfContainer}>
                    <Text style={styles.title}>Allergènes</Text>
                    <Text style={styles.allergenes}>{allergenes}</Text>
                </View>
            </View>
            <View style={styles.bottomNavContainer}>
                <BottomNavigationBar navigation={navigation}/>
            </View>

        </View>
    );
}