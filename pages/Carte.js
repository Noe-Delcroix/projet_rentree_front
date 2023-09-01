import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Product from '../components/Product';
import axios from 'axios';

export default function Carte({ navigation, route, token }) {

    console.log(token)

    const [dishes, setDishes] = useState([])
    const screenWidth = Dimensions.get('window').width;

    const [selectedDishes, setSelectedDishes] = useState([])

    const config = {
        headers:{
            token: token,
        }
    };

    const loadDishes = async () => {
        try {
            axios.get('http://localhost:8080/api/dishes', config).then((response) => {
                console.log(response.data);
                console.log(response);
                setDishes(response.data)
              });
        } catch (error) {
            console.log('ERREUR')
            console.error(error);
        }
    }

    useEffect(() => {
        loadDishes();
    }, []);

    const productContainerStyle = screenWidth < 600 ? styles.smallScreenContainer : styles.largeScreenContainer;
    const titleStyle = screenWidth < 600 ? styles.smallScreentitle : styles.largeScreentitle;


    return (
        <ScrollView>
            <Text style={[styles.title, titleStyle]}>
                La Carte
            </Text>
            <Button
                title="Panier"
                onPress={() =>
                    {
                        console.log(selectedDishes)
                        navigation.navigate('Panier', {dishes: selectedDishes})
                    }
                }
            />
            <View style={[styles.productContainer, productContainerStyle]}>
            {dishes.map(dish => {
                return(
                    <Product 
                    key={dish.name}
                    navigation={navigation}
                    name={dish.name}
                    image={dish.image}
                    description={dish.description}
                    allergenes={dish.allergenes}
                    price={dish.price}
                    setSelectedDishes={setSelectedDishes}
                    />        
                )
            })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap',    
        paddingHorizontal: RFValue(10), 
        rowGap: 0, 
    },
    smallScreenContainer: {
        justifyContent: 'space-between', 
    },
    largeScreenContainer: {
        justifyContent: 'flex-start', 
        columnGap: RFValue(20),  
    },
    title:{
        fontWeight: 'bold',
        fontSize: RFValue(30),
    },
    smallScreentitle:{
        marginBottom: RFPercentage(2),
    },
    largeScreentitle:{
        marginBottom: RFPercentage(0),
    }
});