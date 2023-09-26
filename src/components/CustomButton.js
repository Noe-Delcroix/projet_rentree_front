import React, { useState } from 'react';
import {View, TextInput, TouchableOpacity, Text, Pressable} from 'react-native';

export default function CustomButton({ id, onPress, text }) {

    return (
        <View>
            <Pressable
                className="mr-5 mb-5"
                id={id}
                onPress={() => {
                    onPress()
                }}>
                <Text className="text-xl uppercase bg-[#713235] text-white py-2 px-5 rounded shadow text-center">{text}</Text>
            </Pressable>
        </View>
    );
}
