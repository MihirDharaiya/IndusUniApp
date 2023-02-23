import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryTextInputField from "../components/SecondaryTextInputField";
import Colors from "../constants/Colors";
export default function EmailVerification() {
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/IndusFacultyLogo.png")}
        />
      </View>
      <Card>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/EmailVerificationIcon.png")}
          />
        </View>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>Check Your Email !!</Text>
          <Text style={styles.subText}>
            Enter a code you received in your email to reset your password
          </Text>
        </View>
        <SecondaryTextInputField
          iconVisible={true}
          iconName={"lock"}
          size={responsiveFontSize(3)}
          placeholder={"**********"}
          keyboardType="numeric"
        ></SecondaryTextInputField>
        <PrimaryButton>Verify</PrimaryButton>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginVertical: 16,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: responsiveWidth(70),
    height: responsiveWidth(35),
    marginVertical: 15,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
  },
  mainTextContainer: {
    padding: 2,
    marginVertical: 16,
  },

  mainText: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  subText: {
    fontSize: responsiveFontSize(2.3),
    textAlign: "center",
    color: Colors.grey,
  },
});
