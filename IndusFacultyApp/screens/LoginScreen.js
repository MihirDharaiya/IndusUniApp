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
import SecondaryButton from "../components/SecondaryButton";
import TextInputField from "../components/TextInputField";
import React, { useState } from "react";
import { auth } from "../firebase";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const handleSignUp = () => {
  //   auth
  //     .createUserWithEmailAndPassword()
  //     .then((userCredentials) => {
  //       const user = userCredentials.user;
  //       console.log(user.email);
  //     })
  //     .catch((error) => alert(error.message));
  // };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword()
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require("../assets/images/IndusFacultyLogo.png")}
        />
      </View>
      <Card>
        <View>
          <TextInputField
            title="Username:"
            iconName={"user-tag"}
            iconStyle={{ marginRight: 2 }}
            size={responsiveFontSize(4)}
            placeholder="Enter Email"
            enteredValue={email}
            enteredValueHandler={(text) => setUsername(text)}
          />
          <TextInputField
            title="Password:"
            iconName={"lock"}
            iconStyle={{ marginRight: 12 }}
            size={responsiveFontSize(4)}
            enteredValue={password}
            placeholder="Enter Password"
            enteredValueHandler={(text) => setPassword(text)}
          />

          <Pressable
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
          <PrimaryButton>LogIn</PrimaryButton>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    marginHorizontal: 16,
  },
  containerImage: {
    flex: 1,
    alignItems: "center",
    marginVertical: responsiveHeight(5),
  },
  image: {
    width: responsiveWidth(70),
    height: responsiveWidth(35),
  },
  mainContainer: {
    marginBottom: 10,
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
