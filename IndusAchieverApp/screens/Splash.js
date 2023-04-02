import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { responsiveFontSize,responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'
import {app} from '../firebase/firebase';
import {useState,useEffect} from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const Splash = ({navigation}) => {
const [isLogiIn,setLogin]=useState(false)
const auth=getAuth()

useEffect(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      setLogin(true);
      navigation.navigate("Overview");
    } else {
      setLogin(false);
      navigation.navigate("LoginScreen");
    }
    console.log("user", isLogiIn);
  });
}, [app]);

  return (
    <View style={styles.rootContainer}>
      <ImageBackground
        style={styles.building}
        source={require("../assets/images/IndusMainBuilding.png")}
        resizeMode="cover"
      >
        <View style={styles.containerImage}>
          <Image
            style={styles.logo}
            source={require("../assets/images/Indus.png")}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>Achiever</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Splash

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
})