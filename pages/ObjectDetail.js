import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Product from '../components/Product';

export default function ObjectDetail({ navigation }) {
    return (
        <View>
            <Text>ObjectDetail</Text>
            <Product></Product>
        </View>
    );
}