import React from 'react';
import { Text, View} from 'react-native';

export default function Error({ navigation }) {



    return (
        <View className="flex-1 justify-center items-center">
            <View className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center bg-white shadow-xl">
                <Text className="text-5xl font-bold">Error !</Text>
            </View>
        </View>
    );
}

