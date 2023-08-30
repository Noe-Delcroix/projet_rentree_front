import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Product from '../components/Product';

export default function ObjectDetail({ navigation }) {
    return (
        <View>
            <Text>ObjectDetail</Text>
            <Product title={"oui"} description={"Une description super longue pour tester le saut de ligne ( c'est important pour éviter d'avoir trop de ligne apparante)"}></Product>
        </View>
    );
}