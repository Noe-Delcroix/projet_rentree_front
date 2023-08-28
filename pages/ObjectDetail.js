import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ObjectDetail({ navigation }) {
    return (
        <View>
            <Text>ObjectDetail</Text>
            <Button
                title="Go back to shopping"
                onPress={() =>
                    navigation.navigate('Carte')
                }
            />
        </View>
    );
}