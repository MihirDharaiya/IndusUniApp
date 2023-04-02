import { StyleSheet, Text, View, Pressable } from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useState } from "react";

function SecondaryButton({
  iconVisible,
  iconName,
  size,
  color,
  children,
  onPress,
  buttonStyle,
  textStyle,
  selected = false
}) 

{
  return (
    <View style={[styles.buttonOuterContainer, buttonStyle]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
      >
        {iconVisible === true ? (
          <Icon
            style={styles.iconStyle}
            name={iconName}
            size={size}
            color={color}
          />
        ) : (
          false
        )}
        <Text style={[styles.buttonText, textStyle,{color: selected ? Colors.darkred : Colors.blue}]}>{children}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 15,
    margin: 4,
    borderWidth: 3,
    borderColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInnerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: responsiveFontSize(3),
    textAlign: "center",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.grey,
  },
  iconStyle: {
    padding: 5,
  },
});
export default SecondaryButton;
