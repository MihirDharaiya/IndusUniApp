import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";

export default function ImageTextStack() {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/DoubtSolved.png")}
          style={styles.backdrop1}
        >
          <View style={styles.textContainer}>
            <Text style={styles.imageNumbers}>80</Text>
            <Text style={styles.imageText}> Active Doubts</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/Announcements.png")}
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
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: responsiveHeight(5),
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
    fontWeight: "bold",
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
    fontSize: responsiveFontSize(2.5),
    textAlign: "left",
  },
});
