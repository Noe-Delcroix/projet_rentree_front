import React, { useState } from 'react';
import { CheckBox, View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from '@rneui/themed';


const styles = StyleSheet.create({

  containerVer: {
    //overflow: 'hidden',
    width: '50%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginRight: 10,
  },
  containerHor: {
    //overflow: 'hidden',
    width: 300,
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginRight: 10,
  },
  fonts: {
    marginBottom: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  imageContainer: {
    alignItems: 'center', // Center horizontally
  },
  Image: {
    width: 50,
    height: 50,
    },
  descriptionText: {
    fontSize: 13,
  },
  descriptionContainer:{
    flex: 1, 
    marginLeft: 10, 
    justifyContent: 'center', 
  },
  checkboxContainer: {
    justifyContent: 'center',
  },
  checkbox: {
    alignSelf: 'flex-end',
  },
});



export default function Product({title, image, price, description, allergenes, navigation}) {
  const onPressCard = ()=> {
    navigation.navigate('ObjectDetail',
    {
      title: title,
      image: image,
      description: description,
      allergenes: allergenes
    });
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isSelected, setSelection] = useState(false);
  const isPortrait = windowHeight > windowWidth;

  return (
    <View style={[isPortrait ? styles.containerVer : styles.containerHor]}>
      <Card>
        <TouchableOpacity onPress={onPressCard}>
          <View style={styles.imageContainer}>
          <Card.Image
            style={{ 
              padding: 0, 
              width: isPortrait ? windowWidth/3 : windowWidth/4, 
              height: isPortrait ? windowHeight/6 : windowHeight/6, 
            }}
            source={{ uri: image }}
          />
          </View>
          <Card.Title style={styles.titleText}>{title}</Card.Title>
        </TouchableOpacity>
        <Text  style={{textAlign: 'right',  fontSize: 13 }}>{price}€</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.descriptionContainer, { width: isPortrait ? '70%' : '100%' }]}>
            <Text numberOfLines={isPortrait ? 3 : 4} style={styles.descriptionText}>
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
