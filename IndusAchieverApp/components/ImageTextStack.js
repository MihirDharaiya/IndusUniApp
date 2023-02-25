import { StyleSheet, Text, View, ImageBackground, Pressable } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";
import ActiveDoubts from '../screens/ActiveDoubts';

export default function ImageTextStack() {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.container}>
        <Pressable onPress={ActiveDoubts}>
        <ImageBackground
          source={require("../assets/images/Pencil.jpg")}
          style={styles.backdrop1}
        >
          <View style={styles.textContainer}>
            <Text style={styles.imageNumbers}>80</Text>
            <Text style={styles.imageText}> Active Doubts</Text>
          </View>
        </ImageBackground>
        </Pressable> 
      </View>

      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/Question_mark.jpg")}
          style={styles.backdrop2}
        >
          <View style={styles.textContainer2}>
            <Text style={styles.imageText2}>
              Frequently {"\n"} Asked {"\n"} Doubts
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    flex: 1,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: responsiveHeight(2.8),
    borderRadius: 10,
  },
  container: {
    marginVertical: responsiveHeight(2),
    borderRadius: 6,
    overflow: "hidden",
  },
  backdrop1: {
    width: responsiveWidth(45),
    height: responsiveWidth(25),
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  headline: {
    fontSize: responsiveFontSize(2.5),
    textAlign: "center",
    fontWeight: "600",
    paddingHorizontal: 8,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },
  imageText: {
    fontSize: responsiveFontSize(2.3),
    color: Colors.blue,
    fontWeight: "600",
  },
  imageNumbers: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "600",
    color: Colors.blue,
  },
  backdrop2: {
    width: responsiveWidth(45),
    height: responsiveWidth(25),
  },
  textContainer2: {
    paddingHorizontal: 8,
    alignItems: "baseline",
    paddingVertical: 8,
  },
  imageText2: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.3),
    textAlign: "left",
  },
});
