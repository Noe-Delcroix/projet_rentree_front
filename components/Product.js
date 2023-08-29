import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Svg, Rect } from 'react-native-svg';

const TextForImage = ({navigation}) => {
  const [titleText, setTitleText] = useState("$Title");
  const bodyText = '$Description';

  const onPressTitle = () => {
    navigation.navigate('ObjectDetail');
  };

  return (
    <View style={styles.textContainer}>
      <Text style={styles.baseText}>
      <TouchableOpacity onPress={onPressTitle}>
        <Text style={styles.titleText}>
          {titleText}
        </Text>
        </TouchableOpacity>
        <Text numberOfLines={5}>{bodyText}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  baseText: {
    fontFamily: 'Cochin',
    color: 'black',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default function Product({title, image, description, allergenes, navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://static.cotemaison.fr/medias_10824/w_2048,h_1146,c_crop,x_0,y_184/w_960,h_540,c_fill,g_north/v1456392403/10-conseils-pour-rendre-votre-chien-heureux_5542245.jpg" }}
        style={styles.imageBackground}
      >
        <Svg width="100" height="150">
        </Svg>
      </ImageBackground>
      <TextForImage navigation={navigation}/>
    </View>
  );
}
