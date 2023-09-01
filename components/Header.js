import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            left: '50%'
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        circle: {
            width: 30,
            height: 30,
            backgroundColor: 'red',
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: '-10%',
            top: '10%',
        },
        number: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });



    return (
        <View style={styles.container}>
            <Text style={styles.text}>Delivecrous 🛒</Text>
        </View>
    );
}