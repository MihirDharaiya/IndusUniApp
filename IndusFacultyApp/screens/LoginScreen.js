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
  ImageBackground,
  ToastAndroid,
  Platform,
  AlertIOS,
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
import { app } from "../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebase } from "@react-native-firebase/firestore";
export default function LoginScreen({ navigation }) {
  // Firebase requirements
  const auth = getAuth();
  const db = getFirestore(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const VerifyEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      return true;
    } catch (error) {
      const errorCode = error.code.replace("auth/", "");
      if (Platform.OS === "android") {
        ToastAndroid.show(errorCode, ToastAndroid.SHORT);
      } else {
        AlertIOS.alert("title", "text");
      }
      return false;
    }
  };
  const clearData = () => {
    AsyncStorage.clear();
  };
  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (!user.emailVerified) {
          navigation.navigate("VerifyEmail");
          VerifyEmail(user);
        } else {
          clearData();
          navigation.navigate("Overview");
        }
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        const errorCode = error.code.replace("auth/", "");
        if (Platform.OS === "android") {
          ToastAndroid.show(errorCode, ToastAndroid.SHORT);
        } else {
          AlertIOS.alert("title", "text");
        }
      });
  };
  return (
    <ScrollView style={styles.rootContainer}>
      <ImageBackground
        style={styles.building}
        source={require("../assets/images/IndusMainBuilding.png")}
      >
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
              multiline={true}
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
              multiline={true}
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
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  building: {
    height: responsiveHeight(100),
  },
  signUpContainer: {
    marginHorizontal: 16,
  },
  containerImage: {
    alignItems: "center",
    marginVertical: responsiveHeight(5),
    marginBottom: responsiveHeight(5),
  },
  inputContainer: {
    height: responsiveHeight(30),
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
