import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import BorderCard from "../components/BorderCard";
import TextInputBoxField from "../components/TextInputBoxField";

  
  export default function PastDoubts() {
    return (
      <ScrollView style={styles.rootContainer}>
       <View>
       <View style={styles.titleView}>
            <Icon name="clock" color={Colors.grey} size={responsiveFontSize(3)}/>
            <Text style={styles.activeText}>Past Doubts</Text>
          </View>
        <BorderCard>
          <View style={styles.inputField}>
            <TextInputBoxField title={'Subject:'} editable={false}></TextInputBoxField>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Faculty Name:</Text>
            <Text style={styles.headingText}>Raised On:</Text>
          </View>
          <View style={styles.answerView}>
            <Text style={styles.answerText}>Rahul Bhatt</Text>
            <Text style={styles.answerText}>16/11/2022</Text>
          </View>
          <View style={styles.nameView}>
            <Text style={{fontSize:responsiveFontSize(2.2), fontWeight:'700'}}>By:</Text>
            <Text style={{fontSize:responsiveFontSize(2.2), fontWeight:'700', color:Colors.grey}}>Kusha Patil</Text>
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
    inputField: {
      flex: 1
    },
    headingView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: responsiveHeight(0.5),
      paddingLeft: responsiveWidth(0.6),
      paddingRight: responsiveWidth(0.3),
      paddingTop: responsiveHeight(2)
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
    nameView:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: responsiveHeight(1)
    }
  });
  