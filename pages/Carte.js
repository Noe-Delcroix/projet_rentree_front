import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Product from '../components/Product';

export default function Carte({ navigation }) {
    return (
        <View>
            <Text>Carte</Text>
            <Button
                title="look the product detail"
                onPress={() =>
                    navigation.navigate('ObjectDetail')
                }
            />
            <Button
                title="Panier"
                onPress={() =>
                    navigation.navigate('Panier')
                }
            />
            <Product></Product>
        </View>
    );
}