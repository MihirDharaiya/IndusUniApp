import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../constants/Colors.js";
  
export default function TextInputBoxField({ title, placeholder, lines }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        autoCapitalize="none"
        numberOfLines={lines}
      />
    </View>
 );
}
  
const styles = StyleSheet.create({
    inputContainer: {
      padding: responsiveWidth(1),
      flex: 1,
    },
    titleText: {
      fontSize: responsiveFontSize(2.3),
      fontWeight: "600",
      marginVertical: 4,
    },
    input: {
      borderWidth: 2,
      borderColor: Colors.extralightgrey,
      borderRadius: 10,
      fontSize: responsiveFontSize(2.3),
      textAlignVertical: "top",
      padding: 8,
    },
  });