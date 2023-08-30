import React, { useState } from 'react';
import { CheckBox, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';


const styles = StyleSheet.create({

  container: {
    //overflow: 'hidden',
    width: '45%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginRight: 10,
  },
  fonts: {
    marginBottom: 8,
  },
  Text: {
    fontFamily: 'Cochin',
    color: 'black',
    fontSize: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Image: {
    width: 30,
    height: 30,
    },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'right',
  },
});



export default function Product({title, image, description, allergenes, navigation}) {
  const onPressCard = ()=> {
    navigation.navigate('ObjectDetail',
    {
      title: title,
      image: image,
      description: description,
      allergenes: allergenes
    });
  };

  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
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
    </View>
  );
}
