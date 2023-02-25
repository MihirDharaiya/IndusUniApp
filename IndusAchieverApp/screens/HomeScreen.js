import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView } from "react-native";
import React from "react";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import ImageTextStack from "../components/ImageTextStack";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.conatiner}>
      <Text style={styles.topText}>Here you can create your{"\n"} respective doubts {"\n"} according to the your branch faculties</Text>
      <View style={styles.card}>
      <Card>
        <View style={styles.titleContainer}>
        <View style={styles.imgContainer}>
        <Image
              style={styles.profileImg}
              source={require("../assets/images/Profile.png")}
            />        
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.title}>Name:</Text>
        <Text style={styles.answerTitle}>Rahul Bhatt</Text>
        <Text style={styles.title}>Designation:</Text>
        <Text style={styles.answerTitle}>Assistant Professor</Text>
        </View>      
        </View>
      </Card>
      <Card>
        <View style={styles.titleContainer}>
        <View style={styles.imgContainer}>
        <Image
              style={styles.profileImg}
              source={require("../assets/images/Profile.png")}
            />        
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.title}>Name:</Text>
        <Text style={styles.answerTitle}>Rahul Bhatt</Text>
        <Text style={styles.title}>Designation:</Text>
        <Text style={styles.answerTitle}>Assistant Professor</Text>
        </View>      
        </View>
      </Card>
      <View style={styles.moreCon}>
        <Text style={styles.moreText}>... more</Text>
      </View>
      </View>
        <ImageTextStack></ImageTextStack>
        <View style={styles.calendarView}>
        <ImageBackground
          source={require("../assets/images/Calendar.png")}
          style={styles.CalendarContainer}
        >
          <View style={styles.textContainer}>
            <Text style={styles.calendarText}>Academic Calendar {"\n"} for {"\n"} 2022-2023</Text>
          </View>
        </ImageBackground>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex:1,
    backgroundColor: Colors.white
  },
  card:{
  },
  topText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2)
  },
  imgContainer: {
    margin: 10,
  },
  profileImg: {
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: 25,
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title:{
    fontWeight: '800',
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(2)
  },
  answerTitle: {
    fontWeight: '500',
    marginBottom: responsiveHeight(1),
    color: Colors.grey,
    fontSize: responsiveFontSize(1.8)
  },
  textContainer:{
    padding: 6,
    justifyContent: 'flex-end'
  },
  CalendarContainer: {
    width: responsiveWidth(92),
    height: responsiveHeight(13),  
  },
  calendarText:{
   color:Colors.black,
   fontSize: responsiveFontSize(2.3),
   fontWeight: '600',
   textAlign: 'right',
   padding: 10
  },
  calendarView:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  moreText: {
    color: Colors.grey,
    textAlign: 'center'
  },
  moreCon:{
    marginBottom: 10
  },
});
