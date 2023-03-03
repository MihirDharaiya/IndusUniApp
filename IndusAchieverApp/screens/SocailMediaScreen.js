import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SecondaryTextInputField from '../components/SecondaryTextInputField'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
import Colors from '../constants/Colors';
import AltTextField from '../components/AltTextField';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import GreyCard from '../components/GreyCard';
export default function SocailMediaScreen() {
  const[skill, setSkill] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setText(event.target[0].value);
  };
  return (
    <ScrollView style={styles.rootContainer}>
      <Text style={styles.textStyle}>Add Other Details</Text>
      <View style={styles.inputField}>
        <SecondaryTextInputField
        iconVisible={true}
        iconName={"github"}
        size={responsiveFontSize(3)}
        placeholder={"GitHub ID"}
        keyboardType="email"
        ></SecondaryTextInputField>
        <SecondaryTextInputField
        iconVisible={true}
        iconName={"linkedin"}
        size={responsiveFontSize(3)}
        placeholder={"LinkedIn ID"}
        keyboardType="email"
        ></SecondaryTextInputField>
        <SecondaryTextInputField
        iconVisible={true}
        iconName={"instagram"}
        size={responsiveFontSize(3)}
        placeholder={"Instagram ID"}
        keyboardType="email"
        ></SecondaryTextInputField>
        <SecondaryTextInputField
        iconVisible={true}
        iconName={"twitter"}
        size={responsiveFontSize(3)}
        placeholder={"Twitter ID"}
        keyboardType="email"
        ></SecondaryTextInputField>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.textStyle}>Add Skills</Text>
        <View style={styles.skillSection}>
            <View style={styles.altField}>
            <AltTextField
            placeholder={"Add Revelant Skills"}
            enteredValue={skill}
            enteredValueHandler={(val) => setSkill(val)}
            ></AltTextField>
            </View>
            <View style={styles.altButton}>
            <PrimaryButton
            onPress={handleSubmit}
            >Add</PrimaryButton>
        </View>
        </View>
            <View>
              <GreyCard>
                <Text>{skill}</Text>
              </GreyCard>
            </View>
        <View style={styles.secondButton}>
        <SecondaryButton
        iconVisible={true}
        iconName="bookmark"
        size={responsiveFontSize(3)}
        color={Colors.blue}
        textStyle={{ color: Colors.blue }}
        >
            Save
        </SecondaryButton>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    backgroundColor: Colors.white,
    flex:1
  },
    textStyle: {
        textAlign: 'center',
        padding: 20,
        fontSize: responsiveFontSize(3),
        color:Colors.grey
    },
    inputField: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    field: {
        paddingBottom: 30
    },
    skillSection: {
        flexDirection: 'row',
    },
    altField: {
        width: responsiveWidth(70),
        padding: 15
    },
    altButton: {
        width: responsiveWidth(30),
        height: responsiveHeight(10)
    },
    secondButton: {
        width: responsiveWidth(35),
        height: responsiveHeight(8), 
        marginTop: responsiveHeight(3)
    }
})