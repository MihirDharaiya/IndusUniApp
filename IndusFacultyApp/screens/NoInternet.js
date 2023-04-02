import { Image, StyleSheet, Text, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import React from "react";
import Colors from "../constants/Colors";

const NoInternet = () => {
  return (
    <View style={styles.mainContianer}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require("../assets/images/IndusAchieverLogo.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Please Make Sure You are {"\n"} Connected {"\n"} with a WIFI or Mobile
          Data
        </Text>
      </View>
      <View style={styles.containerImage}>
        <Image
          style={styles.image2}
          source={require("../assets/images/NoInternet.gif")}
        />
      </View>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerImage: {
    alignItems: "center",
    marginVertical: responsiveHeight(5),
  },
  image: {
    width: responsiveWidth(70),
    height: responsiveWidth(35),
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  text: {
    textAlign: "center",
    color: Colors.darkred,
    fontSize: responsiveFontSize(3),
    fontWeight: "600",
  },
  image2: {
    width: responsiveWidth(80),
    height: responsiveWidth(65),
  },
});
