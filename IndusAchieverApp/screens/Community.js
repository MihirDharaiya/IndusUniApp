import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import FlexedButtons from '../components/FlexedButtons'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryTextInputField from '../components/SecondaryTextInputField'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from '../constants/Colors'

export default function Community() {
  return (
    <View>
     <FlexedButtons></FlexedButtons>
     <View style={styles.searchView}>
      <SecondaryTextInputField
      iconVisible={true}
      iconName={"search"}
      size={responsiveFontSize(3)}
      placeholder={"Search By Name"}
      keyboardType="numeric"
      ></SecondaryTextInputField>
      <PrimaryButton>Search</PrimaryButton>
     </View>
     </View>
  )
}

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: Colors.white
    },
    searchView:{
      flexDirection: 'row',
      width: responsiveWidth(100),
      marginTop: responsiveHeight(2),

    }
})