import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from '@rneui/themed';
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

  const dish = {
    name: name,
    image: image,
    description: description,
    alergens: alergens,
    price: price
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isSelected, setSelection] = useState(false);
  const isPortrait = windowHeight > windowWidth && windowWidth < 600 && windowHeight < 1500;


  const select = () => {
    setSelection(!isSelected)
    if (!isSelected) {
      console.log(dish)
      setSelectedDishes(arr => [...arr, dish])
    }
  };

  return (
    <View>
      <Card>
        <TouchableOpacity onPress={onPressCard}>
          <View>
          <Card.Image
            source={{ uri: image }}
          />
          </View>
          <Card.Title>{name}</Card.Title>
        </TouchableOpacity>
        <Text>{price}€</Text>
        <View>
          <View>
            <Text numberOfLines={isPortrait ? 3 : 2}>
              {description}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => addDishesToBasket(id, quantity)}
            >
              <Text>ADD</Text>
            </TouchableOpacity>
          </View>
          </View>
      </Card>
    </View>
    );
  }