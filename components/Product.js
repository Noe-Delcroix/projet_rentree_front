import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Button } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Card } from '@rneui/themed';
import {useApplicationContext} from "./AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {loadDishes} from "../features/dishes/Dishes";
import {addDishesToBasket} from "../features/dishes/Basket";


const styles = StyleSheet.create({

  containerVer: {
    //overflow: 'hidden',
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    margin: 0,
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
    fontWeight: 'bold',
    marginBottom: 0,
  },
  imageContainer: {
    alignItems: 'center',
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
    fontWeight: 'bold',
  },

});



export default function Product({id, name, image, price, description, alergens, route, navigation}) {

  const [quantity] = useState(1);

  const dispatch = useDispatch();

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

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const isPortrait = windowHeight > windowWidth && windowWidth < 600 && windowHeight < 1500;

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
          <Card.Title style={[styles.titleText, {fontSize: isPortrait? RFPercentage(2) : 25,}]}>{name}</Card.Title>
        </TouchableOpacity>
        <Text  style={[{fontSize: isPortrait? RFPercentage(1.75) : 20,}, {textAlign: 'right'}]}>{price}€</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.descriptionContainer, { width: isPortrait ? '70%' : '100%' }]}>
            <Text numberOfLines={isPortrait ? 3 : 2} style={{fontSize: isPortrait? RFPercentage(1.75) : 20,}}>
              {description}
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
                onPress={() => dispatch(addDishesToBasket({ dishId: id, quantity: quantity }))}
                style={[isPortrait ? styles.smallcustomButton : styles.largecustomButton]}
            >
              <Text style={[styles.customButtonText,{fontSize: isPortrait? RFPercentage(1.75) : 20,}]}>ADD</Text>
            </TouchableOpacity>
          </View>
          </View>
      </Card>
    </View>
    );
  }