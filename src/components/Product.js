import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image, Button} from 'react-native';
import {useApplicationContext} from "./ApplicationContext";

export default function Product({id, name, image, price, description, alergens, route, navigation}) {

    const [quantity] = useState(1);
    const { addDishesToBasket } = useApplicationContext();

    const onPressCard = ()=> {
        navigation.navigate('ObjectDetail',
            {
                id: id,
                name: name,
                image: image,
                description: description,
                alergens: alergens,
                price: price,
            });
    };

    return (
        <View className="w-full md:w-1/2 xl:w-1/4">
            <View className="bg-white shadow-xl m-3 h-full">
                <TouchableOpacity onPress={onPressCard}>
                    <Image className="w-full h-[400px]"
                           source={{ uri: image }}
                    />
                </TouchableOpacity>
                <View className="mt-3 mb-7 px-10 flex-1 flex flex-col justify-between">
                    <View className="flex flex-row items-center justify-between w-full">
                        <Text className="text-3xl">{name}</Text>
                        <Text className="text-2xl text-[#713235] font-bold">{price.toFixed(2)}€</Text>
                    </View>
                    <Text className="my-5 text-xl">{description} </Text>

                    <View className="w-full shadow">
                        <Button
                            color={'#713235'}
                            title='Add to basket'
                            onPress={() => addDishesToBasket(id, quantity)}
                        />
                    </View>

                </View>
            </View>
        </View>



    );
}
