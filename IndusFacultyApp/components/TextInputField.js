import { View, TextInput, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../constants/Colors";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

function TextInputField({
  title,
  iconName,
  size,
  iconStyle,
  placeholder,
  keyboardType,
  maxLength,
  editable,
  enteredValue,
  enteredValueHandler,
  secureTextEntry,
  numberOfLines,
  multiline,
}) {
  return (
    <View style={styles.outersearchSection}>
      <View style={styles.searchSection}>
        <Icon
          style={[styles.IconStyle, iconStyle]}
          name={iconName}
          size={size}
          color={Colors.blue}
        />
        <View style={styles.inputCotainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              secureTextEntry={secureTextEntry}
              style={styles.input}
              placeholder={placeholder}
              maxLength={maxLength}
              keyboardType={keyboardType}
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredValue}
              editable={editable}
              onChangeText={enteredValueHandler}
              numberOfLines={numberOfLines}
              multiline={multiline}
            />
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
}

export default TextInputField;

const styles = StyleSheet.create({
  outersearchSection: {
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: responsiveHeight(1),
  },
  titleText: {
    fontSize: responsiveFontSize(2.1),
    color: Colors.blue,
  },
  searchSection: {
    flexDirection: "row",
    backgroundColor: Colors.white,
  },
  IconStyle: {
    padding: responsiveWidth(2),
    marginRight: 10,
    marginTop: 5,
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(2.3),
  },
  line: {
    height: 1,
    marginTop: 5,
    backgroundColor: Colors.black,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 3,
  },
  textInputView: {
    width: responsiveWidth(70),
  },
});
