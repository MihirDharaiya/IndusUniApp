import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React, { useContext } from "react";
import Colors from "../../constants/Colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { app } from "../../firebase";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { SignInContext } from "../../context/AuthContext";
const Splash = ({ navigation }) => {
  const auth = getAuth();
  const { dispatchSignedIn } = useContext(SignInContext);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalVisible(false);
    }, 3000);
    clearTimeout(timeout);
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });
        console.log(user);
        navigation.navigate("Overview");
      } else {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: null },
        });
        navigation.navigate("LoginScreen");
        console.log("in Else condition");
      }
    });
  }, [app]);

  return (
    <View style={styles.rootContainer}>
      <ImageBackground
        style={styles.building}
        source={require("../../assets/images/IndusMainBuilding.png")}
        resizeMode="cover"
      >
        <View style={styles.containerImage}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/IndusLogo.png")}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>Faculty</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerImage: {
    alignItems: "center",
    marginVertical: responsiveHeight(5),
    marginTop: 60,
  },
  logo: {
    width: responsiveWidth(80),
    height: responsiveHeight(15),
  },
  building: {
    flex: 1,
  },
  text: {
    color: Colors.blue,
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    textAlign: "center",
  },
  textView: {},
});
