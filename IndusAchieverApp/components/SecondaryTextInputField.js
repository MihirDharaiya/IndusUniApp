import { StyleSheet, TextInput, View } from "react-native";
import Colors from "../constants/Colors";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/FontAwesome5";
export default function SecondaryTextInputField({
  iconName,
  size,
  placeholder,
  keyboardType,
  maxLength,
  enteredValue,
  enteredValueHandler,
}) {
  return (
    <View style={styles.searchSection}>
      <Icon
        style={styles.searchIcon}
        name={iconName}
        size={size}
        color={Colors.grey}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        maxLength={maxLength}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        value={enteredValue}
        onChangeText={enteredValueHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.extralightgrey,
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(2.3),
  },
});
