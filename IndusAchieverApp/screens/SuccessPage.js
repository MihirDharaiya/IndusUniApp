import { StyleSheet, Text, View, Image,Modal } from 'react-native'
import {React,useState,useEffect} from 'react'
import Colors from '../constants/Colors'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";

const SuccessPage = () => {

  return (
    <View style={styles.mainContianer}>
        <View style={styles.textContainer}>
            <Text style={styles.text}>Your Doubt Has Been {"\n"} Created Successfully !!</Text>
        </View>
        <View style={styles.containerImage}>
        <Image
          style={styles.image2}
          source={require("../assets/images/Success.gif")}
        />
        </View>
        </View>
  )
}

export default SuccessPage

const styles = StyleSheet.create({
    mainContianer:{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center'
    },
    textContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    text:{
        textAlign: 'center',
        color: Colors.green,
        fontSize: responsiveFontSize(3.5),
        fontWeight: '600'
    },
    image2: {
        width: responsiveWidth(80),
        height: responsiveWidth(65),
    },
    containerImage: {
        alignItems: "center",
        marginVertical: responsiveHeight(5),
      },
})