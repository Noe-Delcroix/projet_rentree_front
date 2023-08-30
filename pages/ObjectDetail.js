import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Product from '../components/Product';
import { Image } from 'react-native-web';
import { CheckBox } from '@rneui/base';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    fullwidthImage: {
        width: '100%',
        aspectRatio: 1,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
    price: {
        fontSize: 18,
        color: 'green',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    allergenes: {
        fontSize: 16,
    },
    divider: {
        width: 1,
        height: '100%',
        marginHorizontal: 10,
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfContainer: {
        flex: 1,
    },
});

export default function ObjectDetail({ route, navigation }) {
    const { title, image, description, allergenes, price, check=false } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                style={styles.fullwidthImage}
                source={{
                    uri: image,
                }}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{price} €</Text>
                <CheckBox checked={check}></CheckBox>
            </View>

            <View style={styles.columnContainer}>
                <View style={styles.halfContainer}>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.halfContainer}>
                    <Text style={styles.title}>Allergènes</Text>
                    <Text style={styles.allergenes}>{allergenes}</Text>
                </View>
            </View>
        </View>
    );
}
