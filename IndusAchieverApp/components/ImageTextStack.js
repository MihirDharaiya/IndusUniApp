import { StyleSheet, Text, View, ImageBackground, Pressable } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";
import ActiveDoubts from '../screens/ActiveDoubts';

export default function ImageTextStack({onPressActive, onPressQuestions,count}) {
    return (
    <View style={styles.boxContainer}>
      <View style={styles.container}>
        <Pressable onPress={onPressActive}>
        <ImageBackground
          source={require("../assets/images/Pencil.jpg")}
          style={styles.backdrop1}
        >
          <View style={styles.textContainer}>
            <Text style={styles.imageNumbers}>{count}</Text>
            <Text style={styles.imageText}> Active Doubts</Text>
          </View>
        </ImageBackground>
        </Pressable> 
      </View>

      <View style={styles.container}>
        <Pressable onPress={onPressQuestions}>
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
        </Pressable>
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
    marginVertical: responsiveHeight(1.5),
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
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center'
  },
  imageText: {
    marginBottom: responsiveHeight(0.4),
    fontSize: responsiveFontSize(2),
    color: Colors.blue,
    fontWeight: "600",
  },
  imageNumbers: {
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(2.2),
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
    fontSize: responsiveFontSize(2),
    textAlign: "left",
  },
});
