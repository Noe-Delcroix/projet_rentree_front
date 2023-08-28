import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

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
        </View>
    );
}