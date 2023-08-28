import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Panier({ navigation }) {
    return (
        <View>
            <Text>Panier</Text>
            <Button
                title="go back to the menu"
                onPress={() =>
                    navigation.navigate('Carte')
                }
            />
            <Button
                title="pay"
                onPress={() =>
                    navigation.navigate('Order')
                }
            />
        </View>
    );
}