import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Product from '../components/Product';

export default function Carte({ navigation }) {
    return (
        <View>
            <Text>Carte</Text>
            <Button
                title="Panier"
                onPress={() =>
                    navigation.navigate('Panier')
                }
            />
            <Product navigation={navigation} title={"oui"} price={"10"} description={"Une description super longue pour tester le saut de ligne ( c'est important pour éviter d'avoir trop de ligne apparante)"}></Product>
        </View>
    );
}