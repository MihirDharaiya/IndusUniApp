import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

export default function Notification() {
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.noActivityContainer}>
        <Text style={styles.noActivityText}>No activity at the moment</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  noActivityContainer: {
    justifyContent: "center",
    height: responsiveHeight(80),
  },
  noActivityText: {
    textAlign: "center",
    fontSize: responsiveFontSize(2.3),
    fontWeight: "300",
    color: Colors.grey,
  },
});
