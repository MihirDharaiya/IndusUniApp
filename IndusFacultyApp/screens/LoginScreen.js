import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  ToastAndroid,
  Platform,
  AlertIOS,
  BackHandler,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import TextInputField from "../components/TextInputField";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTogglePasswordVisibility } from "../components/ViewPassword";
export default function LoginScreen({ navigation }) {
  // Firebase requirements
  const auth = getAuth();
  const db = getFirestore(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
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
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to Exit the Application?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });
  const handleLogin = async () => {
    const reg = /[a-z]+\.[a-z]+@indusuni\.ac\.in/i;
    if (!reg.test(email) && email !== "jainish9726@gmail.com") {
      setEmail("");
      setPassword("");
      setError("Please Enter Valid University Email !!");
    } else if (password == "") {
      setError("Pleaser Enter Password");
    } else {
      setError("");
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
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
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
        <Card cardStyle={{ marginBottom: responsiveHeight(25) }}>
          <View>
            <TextInputField
              title="Username:"
              iconName={"at"}
              iconStyle={{ marginRight: responsiveWidth(2) }}
              size={responsiveFontSize(3.7)}
              placeholder="Enter Username"
              enteredValue={email}
              enteredValueHandler={(text) => setEmail(text)}
              multiline={true}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <View style={styles.EyeContainer}>
                <Icon name={rightIcon} style={styles.eyeIcon} />
              </View>
            </Pressable>
            <TextInputField
              title="Password:"
              iconName={"lock"}
              size={responsiveFontSize(4)}
              placeholder="Enter Password"
              enteredValue={password}
              enteredValueHandler={(password) => setPassword(password)}
              secureTextEntry={passwordVisibility}
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
          {error == "" ? null : (
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ color: Colors.red, textAlign: "center" }}>
                {error}
              </Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleLogin()}>LogIn</PrimaryButton>
          </View>
        </Card>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  building: {
    flex: 1,
    resizeMode: "cover",
  },

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
    backgroundColor: Colors.white,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
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
  building: {
    flex: 1,
  },
  eyeIcon: {
    color: "#232323",
    fontSize: responsiveFontSize(3),
  },
  EyeContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 16,
  },
});
