import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Button } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Card } from '@rneui/themed';
import {useApplicationContext} from "../components/ApplicationContext";


const styles = StyleSheet.create({

  containerVer: {
    //overflow: 'hidden',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    height:'auto',
  },
  containerHor: {
    //overflow: 'hidden',
    width: 300,
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
    fontSize: RFPercentage(1.75),
  },
  descriptionContainer:{
    flex: 1, 
    justifyContent: 'center', 
  },
  button:{
    backgroundColor: '#00B4EC', 
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
    justifyContent: 'flex-end',
    borderRadius: 5,
  },
  smallcustomButton: {
    paddingHorizontal: 10, 
    paddingVertical: 5,  
  },
  largecustomButton: {
    paddingHorizontal: 20, 
    paddingVertical: 10, 
  },

  customButtonText: {
    color: 'white', 
    fontSize: RFPercentage(1.75), 
    fontWeight: 'bold',
  },

});



export default function Product({id, name, image, price, description, alergens, route, navigation}) {

  const [quantity, setQuantity] = useState(1);
  const { dishes, numberOfDishes, addDishes, removeDishes } = useApplicationContext();

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
    <View style={[isPortrait ? styles.containerVer : styles.containerHor]}>
      <Card>
        <TouchableOpacity onPress={onPressCard}>
          <View style={styles.imageContainer}>
          <Card.Image
            style={{ 
              width: isPortrait ? 150 : 300, 
              height: isPortrait ? 150 : 300, 
            }}
            source={{ uri: image }}
          />
          </View>
          <Card.Title style={styles.titleText}>{name}</Card.Title>
        </TouchableOpacity>
        <Text  style={[styles.descriptionText, {textAlign: 'right'}]}>{price}€</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.descriptionContainer, { width: isPortrait ? '70%' : '100%' }]}>
            <Text numberOfLines={isPortrait ? 3 : 2} style={styles.descriptionText}>
              {description}
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => addDishes(id, price, quantity)}
              style={[isPortrait ? styles.smallcustomButton : styles.largecustomButton]}
            >
              <Text style={styles.customButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>
          </View>
      </Card>
    </View>
    );
  }