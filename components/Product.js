import React, { useState } from 'react';
import { CheckBox, View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from '@rneui/themed';


const styles = StyleSheet.create({

  containerVer: {
    //overflow: 'hidden',
    width: '45%',
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
  Image: {
    width: 30,
    height: 30,
    },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'right',
  },
});



export default function Product({title, image, price, description, allergenes, navigation}) {
  const onPressCard = ()=> {
    navigation.navigate('ObjectDetail');
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isSelected, setSelection] = useState(false);
if(windowHeight>windowWidth){
  return (
    <View style={styles.containerVer}>
        <Card>
        <TouchableOpacity onPress={onPressCard}>
          <Card.Image
            style={{ padding: 0, width: '100%', height: 70 }}
            source={{ uri: "https://static.cotemaison.fr/medias_10824/w_2048,h_1146,c_crop,x_0,y_184/w_960,h_540,c_fill,g_north/v1456392403/10-conseils-pour-rendre-votre-chien-heureux_5542245.jpg" }}
          />
          <Card.Title style={styles.titleText}>{title}</Card.Title>
          </TouchableOpacity>
          <Text  style={{textAlign: 'right', alignItems: "flex-start", fontSize: 13 }}>{price}€</Text>
          <Text numberOfLines={3} style={{ width: 100, fontSize: 13 }}>{description}</Text>
          <View style={styles.checkboxContainer}>
          <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        </View>
        </Card>
        <Text>{windowHeight} * {windowWidth}</Text>
    </View>
  );
}else{
  return (
    <View style={styles.containerHor}>
        <Card>
        <TouchableOpacity onPress={onPressCard}>
          <Card.Image
            style={{ padding: 0, width: '100%', height: 70 }}
            source={{ uri: "https://static.cotemaison.fr/medias_10824/w_2048,h_1146,c_crop,x_0,y_184/w_960,h_540,c_fill,g_north/v1456392403/10-conseils-pour-rendre-votre-chien-heureux_5542245.jpg" }}
          />
          <Card.Title style={styles.titleText}>{title}</Card.Title>
          </TouchableOpacity>
          <Text style={{ fontSize: 13 }}>{description}</Text>
          <View style={styles.checkboxContainer}>
          <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        </View>
        </Card>
        <Text>{windowHeight} * {windowWidth}</Text>
    </View>
  );
}
}
