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
            <Product navigation={navigation}></Product>
        </View>
    );
}