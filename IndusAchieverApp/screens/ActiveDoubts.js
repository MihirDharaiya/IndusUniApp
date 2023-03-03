import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
  import { StyleSheet, Text, View, ScrollView } from "react-native";
  import React from "react";
import BorderCard from "../components/BorderCard";
import Colors from "../constants/Colors";
import TextInputBoxField from "../components/TextInputBoxField";
import Icon from "react-native-vector-icons/FontAwesome5";
  
  export default function ActiveDoubts() {
    return (
      <ScrollView style={styles.rootContainer}>
        <View>
          <View style={styles.titleView}>
            <Icon name="user-clock" color={Colors.grey} size={responsiveFontSize(3)}/>
            <Text style={styles.activeText}>Active Doubts</Text>
          </View>
        <BorderCard>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Faculty Name:</Text>
            <Text style={styles.headingText}>Raised On:</Text>
          </View>
          <View style={styles.answerView}>
            <Text style={styles.answerText}>Rahul Bhatt</Text>
            <Text style={styles.answerText}>16/11/2022</Text>
          </View>
          <View style={styles.inputField}>
            <TextInputBoxField title={'Subject:'} lines={1}></TextInputBoxField>
          </View>
          <View style={styles.outerView}>
          <View style={styles.textIconView}>
            <Icon name="times-circle" color={Colors.darkred} size={responsiveFontSize(2.5)}/>
            <Text style={{color:Colors.darkred, fontSize: responsiveFontSize(2.5), fontWeight: '500', paddingLeft:responsiveWidth(1)}}>Dismiss</Text>
          </View>
          <View style={styles.textIconView}>
            <Icon name="reply-all" color={Colors.black} size={responsiveFontSize(2.5)}/>
            <Text style={{fontSize: responsiveFontSize(2.5) ,fontWeight: '500', paddingLeft:responsiveWidth(1)}}>Reply</Text>
          </View>
          <View style={styles.textIconView}>
            <Icon name="check-circle" color={Colors.green} size={responsiveFontSize(2.5)}/>
            <Text style={{color:Colors.green, fontSize: responsiveFontSize(2.5), fontWeight: '500', paddingLeft:responsiveWidth(1)}}>Resolve</Text>
          </View>
          </View>
        </BorderCard>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: Colors.white
    },
    headingView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: responsiveHeight(0.5),
      paddingLeft: responsiveWidth(0.6),
      paddingRight: responsiveWidth(0.3)
    },
    headingText: {
      fontWeight: '700',
      fontSize: responsiveFontSize(2)
    },
    answerView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: responsiveWidth(0.6),
      paddingRight: responsiveWidth(0.3),
      paddingBottom: responsiveHeight(1)
    },
    answerText: {
      fontWeight: '700',
      fontSize: responsiveFontSize(2),
      color:Colors.grey
    },
    inputField: {
      flex: 1
    },
    activeText: {
      fontSize: responsiveFontSize(3),
      color:Colors.grey,
      fontWeight: '500',
      paddingLeft: responsiveWidth(2),
    },
    titleView:{
      paddingTop: responsiveHeight(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: responsiveHeight(2)
    },
    textIconView: {
      flexDirection: 'row',
    },
    outerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10
    }
  });
  