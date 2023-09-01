import React, { useState } from 'react';
import { CheckBox, View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Card } from '@rneui/themed';


const styles = StyleSheet.create({

  containerVer: {
    //overflow: 'hidden',
    width: '50%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height:'auto',
  },
  containerHor: {
    //overflow: 'hidden',
    width: 300,
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height:'auto',
  },
  titleText: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginBottom: 0,
  },
  imageContainer: {
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: RFPercentage(1.8),
  },
  descriptionContainer:{
    flex: 1, 
    justifyContent: 'center', 
  },
  checkboxContainer: {
    justifyContent: 'center',
  },
  checkbox: {
    alignSelf: 'flex-end',
  },
});



export default function Product({name, image, price, description, allergenes, navigation, setSelectedDishes}) {

  const onPressCard = ()=> {
    navigation.navigate('ObjectDetail',
    {
      name: name,
      image: image,
      description: description,
      allergenes: allergenes,
      price: price
    });
  };

  const dish = {
    name: name,
    image: image,
    description: description,
    allergenes: allergenes,
    price: price
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isSelected, setSelection] = useState(false);
  const isPortrait = windowHeight > windowWidth;

  const select = () => {
    setSelection(!isSelected)
    if(!isSelected){
      console.log(dish)
      setSelectedDishes(arr => [...arr, dish])
    }
  }
  return (
    <View style={[isPortrait ? styles.containerVer : styles.containerHor]}>
      <Card>
        <TouchableOpacity onPress={onPressCard}>
          <View style={styles.imageContainer}>
          <Card.Image
            style={{ 
              width: isPortrait ? windowWidth * 0.35 : 300, 
              height: isPortrait ? windowHeight *0.2 : 300, 
            }}
            source={{ uri: image }}
          />
          </View>
          <Card.Title style={styles.titleText}>{name}</Card.Title>
        </TouchableOpacity>
        <Text  style={{textAlign: 'right',  fontSize: RFPercentage(1.8) }}>{price}€</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.descriptionContainer, { width: isPortrait ? '70%' : '100%' }]}>
            <Text numberOfLines={isPortrait ? 3 : 2} style={styles.descriptionText}>
              {description}
            </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
          </View>
        </View>
      </Card>
    </View>
  );
}