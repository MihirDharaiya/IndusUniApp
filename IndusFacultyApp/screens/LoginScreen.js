import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import TextInputField from "../components/TextInputField";
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // if (!userCredentials.user.emailVerified) {
        //   user.sendEmailVerification();
        //   navigation.navigate("VerifyEmail");
        // }
        navigation.navigate("Overview");
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require("../assets/images/IndusFacultyLogo.png")}
        />
      </View>
      <Card>
        <View style={styles.inputContainer}>
          <TextInputField
            title="Email Id:"
            iconName={"at"}
            iconStyle={{ marginRight: 2 }}
            size={responsiveFontSize(4)}
            placeholder="Enter Email"
            enteredValue={email}
            enteredValueHandler={(text) => setEmail(text)}
          />
          <TextInputField
            title="Password:"
            iconName={"lock"}
            iconStyle={{ marginRight: 12 }}
            size={responsiveFontSize(4)}
            enteredValue={password}
            placeholder="********"
            enteredValueHandler={(text) => setPassword(text)}
          />

          <Pressable
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
            style={({ pressed }) =>
              pressed
                ? [styles.buttonInnerContainer, styles.pressed]
                : styles.buttonInnerContainer
            }
          >
            <View style={styles.forgotPassContainer}>
              <Text style={styles.forgotPass}>Forgot Password?</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => handleLogin()}>LogIn</PrimaryButton>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  signUpContainer: {
    marginHorizontal: 16,
  },
  containerImage: {
    flex: 1,
    alignItems: "center",
    marginVertical: responsiveHeight(5),
    marginBottom: responsiveHeight(5),
  },
  inputContainer: {
    marginTop: responsiveHeight(5),
  },
  image: {
    width: responsiveWidth(70),
    height: responsiveWidth(35),
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 20,
  },
  pressed: {
    opacity: 0.5,
  },
  forgotPassContainer: {
    marginRight: 12,
    marginBottom: responsiveHeight(6),
  },
  forgotPass: {
    fontSize: responsiveFontSize(1.9),
    textAlign: "right",
    color: Colors.darkred,
  },
  buttonContainer: {
    marginBottom: responsiveHeight(5),
  },
});
