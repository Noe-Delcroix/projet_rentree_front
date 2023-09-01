import React from 'react';
import { View, Text, Button, FlatList, Image, CheckBox } from 'react-native';

export default function Panier({ navigation, route }) {
    const dishes = route.params.dishes;
    console.log(dishes)
    return (
        <View>
        <Text>Panier</Text>
        <Button
            title="Retourner au menu"
            onPress={() => navigation.navigate('Carte')}
        />
        <Button
            title="Payer"
            onPress={() => navigation.navigate('Order')}
        />

        <FlatList
            data={dishes}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Image
                source={{ uri: item.image }} // Assurez-vous que item.image contient l'URL de l'image
                style={{ width: 100, height: 100, marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
                <Text>{item.description}</Text>
                </View>
                <View>
                <CheckBox checked={true} /> {/* Vous pouvez gérer la valeur checked en fonction de l'état du panier */}
                </View>
            </View>
            )}
        />
        </View>
    );
}
