import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function PasswordInput({ id, onChangeTextFunction }) {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setPasswordVisibility((prevVisibility) => !prevVisibility);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 4 }}>
            <TextInput
                className="mb-2 p-2 border border-[#713235] rounded"
                id={id}
                secureTextEntry={!isPasswordVisible}
                onChangeText={onChangeTextFunction}
                style={{ flex: 1 }}
                placeholder="Enter Password"
            />
            <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                <Text style={{ padding: 8 }}>
                    {isPasswordVisible ? 'Hide' : 'Show'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
