import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import ImageTextStack from "../components/ImageTextStack";
import {getFirestore, getDocs, doc, collection, onSnapshot, limit, query} from 'firebase/firestore';
import {app} from '../firebase/firebase';
import { getAuth} from "firebase/auth";


export default function HomeScreen({navigation}) {

  const [faculty,setFaculty] = useState([]);
  const db = getFirestore(app);
  const auth=getAuth();
  const [renderNum, setRenderNum] = useState(2);

async function getFaculty(){
  const docRef = query(collection(db,"faculty"), limit(renderNum));
  const docSnap = await getDocs(docRef);
  var arr=[]
    docSnap.forEach(doc => {
        arr.push(doc.data())     
  })
  setFaculty(arr)
}
useEffect(() => {
  getFaculty()
},[renderNum])


function card(data) {
  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate("CreateDoubtScreen",{data:data});
          
        }}
        >
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
        <Text style={styles.answerTitle}>{data.name}</Text>
        <Text style={styles.title}>Designation:</Text>
        <Text style={styles.answerTitle}>{data.position}</Text>
        </View>      
        </View>
      </Card>
      </Pressable>
    </View>
  )
}

  return (
    <ScrollView style={styles.conatiner}>
      <Text style={styles.topText}>Here you can create your{"\n"} respective doubts {"\n"} according to the your branch faculties</Text>
      <View style={styles.card}>
        <View>
      <FlatList
      data={faculty}
      renderItem={({item}) => card(item)}
      keyExtractor={data => data.id}
      initialNumToRender={1}
      >
      </FlatList>
      </View>
      <View style={styles.moreCon}>
      {renderNum >= 4 ? null : <Pressable
        onPress={()=>{
          setRenderNum(renderNum*2);
        }}
        >
        <Text style={styles.moreText}>... more</Text>
        </Pressable> }
      </View>
      </View>
        <ImageTextStack onPressActive={() => {navigation.navigate("ActiveDoubts");}}
        onPressQuestions={() => {navigation.navigate("FrequentlyAskedQuestion");}}
        ></ImageTextStack>
        <View style={styles.calendarView}>
          <Pressable
          onPress={() => {
            navigation.navigate("AcademicCalendar");
          }}
          >
        <ImageBackground
          source={require("../assets/images/Calendar.png")}
          style={styles.CalendarContainer}
        >
          <View style={styles.textContainer}>
            <Text style={styles.calendarText}>Academic Calendar {"\n"} for {"\n"} 2022-2023</Text>
          </View>
        </ImageBackground>
        </Pressable>
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
    marginBottom: responsiveHeight(4),
    width: responsiveWidth(92),
    height: responsiveHeight(15),  
  },
  calendarText:{
   color:Colors.black,
   fontSize: responsiveFontSize(2.3),
   fontWeight: '600',
   textAlign: 'right',
   paddingTop: responsiveHeight(1.1),
   paddingRight: responsiveWidth(2)
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
