import { StyleSheet, Text, View, Image, ScrollView, ImageBackground } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryTextInputField from "../components/SecondaryTextInputField";
import Colors from "../constants/Colors";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
export default function ForgotPassword({navigation}) {
const [email, setEmail] = useState("");
const auth = getAuth();
const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.navigate("EmailVerification");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.building}
        source={require("../assets/images/IndusMainBuilding.png")}
      >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/IndusAchieverLogo.png")}
        />
      </View>
      <Card>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/ForgotPasswordIcon.png")}
          />
        </View>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>Forgot Your Password ??</Text>
          <Text style={styles.subText}>
            Enter your email address to {"\n"}retrieve your password
          </Text>
        </View>
        <SecondaryTextInputField
          iconVisible={true}
          iconName={"at"}
          size={responsiveFontSize(3)}
          placeholder={"example@gmail.com"}
          enteredValue={email}
          enteredValueHandler={(text) => setEmail(text)}
        ></SecondaryTextInputField>
        <PrimaryButton onPress={handleReset}>Reset Password</PrimaryButton>
      </Card>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white
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
    width: responsiveWidth(50),
    height: responsiveWidth(50),
    marginBottom: -20,
  },
  mainTextContainer: {
    padding: 2,
    marginVertical: 16,
  },

  mainText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  subText: {
    fontSize: responsiveFontSize(2.3),
    textAlign: "center",
    color: Colors.grey,
  },
  building: {
    height: responsiveHeight(100)
  }
});
