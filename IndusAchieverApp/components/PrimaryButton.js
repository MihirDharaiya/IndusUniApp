import { View, Pressable, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
function PrimaryButton({
  iconName,
  size,
  iconVisible,
  textNotVisible,
  children,
  onPress,
  textStyle,
}) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary500 }}
      >
        {iconVisible ? (
          <Icon
            style={textNotVisible ? true : styles.iconStyle}
            name={iconName}
            size={size}
            color={Colors.white}
          />
        ) : (
          false
        )}
        {textNotVisible ? (
          true
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{children}</Text>
        )}
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 10,
    margin: 8,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    flexDirection: "row",
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: responsiveFontSize(3),
    fontWeight: 'semi-bold'
  },
  pressed: {
    opacity: 0.8,
  },
  row: {
    flexDirection: "row",
    padding: 5,
  },
  iconStyle: {
    paddingRight: 10,
  },
});
