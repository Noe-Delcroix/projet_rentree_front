import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Product from '../components/Product';
import { Image } from 'react-native-web';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    fullwidthImage: {
        width: '100%', // Utilisez '100%' pour occuper toute la largeur de l'écran
        aspectRatio: 1,
    },
});

export default function ObjectDetail({ route, navigation }) {
    const { title, image, description, allergenes } = route.params;
    
    return (
        <View>
            <Image
                style={styles.fullwidthImage}
                source={{
                    uri: image,
                }}
            />
            <Text>{title}</Text>
            <Text>{description}</Text>
            <Text>{allergenes}</Text>
        </View>
    );
}
