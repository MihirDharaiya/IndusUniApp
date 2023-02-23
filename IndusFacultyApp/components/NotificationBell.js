import { StyleSheet, Pressable, Text, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/FontAwesome";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";
export default function NotificationBell({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.button}>
        <Ionicons
          name="bell"
          size={responsiveFontSize(3.5)}
          color={Colors.blue}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 6,
    margin: 6,
    marginRight: 16,
    marginBottom: 8,
  },
  pressed: {
    opacity: 0.8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});
