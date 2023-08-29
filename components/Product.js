import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Svg, Rect } from 'react-native-svg';

const TextForImage = () => {
  const [titleText, setTitleText] = useState("$Title");
  const bodyText = '$Description';

  const onPressTitle = () => {
    setTitleText("Renvoi");
  };

  return (
    <View style={styles.textContainer}>
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={onPressTitle}>
          {titleText}
        </Text>
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
    color: 'pink',
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

export default function Product() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://static.cotemaison.fr/medias_10824/w_2048,h_1146,c_crop,x_0,y_184/w_960,h_540,c_fill,g_north/v1456392403/10-conseils-pour-rendre-votre-chien-heureux_5542245.jpg" }}
        style={styles.imageBackground}
      >
        <Svg width="100" height="150">
        </Svg>
      </ImageBackground>
      <TextForImage />
    </View>
  );
}
