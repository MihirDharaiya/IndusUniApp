import { StyleSheet, Text, View, Pressable } from 'react-native'
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
function RoundButton({
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
  
  export default RoundButton;
  
  const styles = StyleSheet.create({
    buttonOuterContainer: {
      borderRadius: 30,
      margin: 10,
      overflow: "hidden",
    },
    buttonInnerContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.blue,
      paddingHorizontal: 10,
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
    },
    iconStyle: {
      paddingRight: 10,
    },
  });