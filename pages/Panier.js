import React from 'react';
import {View, Text, Button, FlatList, Image, CheckBox, StyleSheet} from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";

export default function Panier({ navigation, route }) {
    const dishes = route.params.dishes;
    console.log(dishes)
    return (
        <View  style={styles.pageView}>
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
            <View style={styles.bottomNavContainer}>
                <BottomNavigationBar navigation={navigation} articleNumber={dishes.length} selectedDishes={dishes}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    bottomNavContainer: {
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
    },
    pageView: {
        height: '100%'
    }
});
