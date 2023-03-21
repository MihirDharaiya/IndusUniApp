import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import {React, useEffect, useState} from "react";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import BorderCard from "../components/BorderCard";
import TextInputBoxField from "../components/TextInputBoxField";
import { getAuth} from "firebase/auth";
import {getFirestore, getDocs, doc, collection, onSnapshot, limit, query} from 'firebase/firestore';
import {app} from '../firebase/firebase';


  
  export default function PastDoubts() {
    const auth=getAuth();
    const [doubts,setDoubts] = useState([]);
    const db = getFirestore(app);

    async function getDoubts(){
      const docRef = query(collection(db,"doubts"));
      const docSnap = await getDocs(docRef);
      var arr=[]
        docSnap.forEach(doc => {
            arr.push(doc.data())     
      })
      setDoubts(arr)
    }
    useEffect(() => {
      getDoubts()
    },[])
    function card(data) {
      return (
        <View>
       
        <BorderCard>
          <View style={styles.inputField}>
            <TextInputBoxField title={'Subject:'} editable={false} enteredValue={data.subject} multiline={true}></TextInputBoxField>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Faculty Name:</Text>
            <Text style={styles.headingText}>Raised On:</Text>
          </View>
          <View style={styles.answerView}>
            <Text style={styles.answerText}>{data.facultyName}</Text>
            <Text style={styles.answerText2}>{data.date}</Text>
          </View>
        </BorderCard>
       </View>
        )
      }
    return (
      <ScrollView style={styles.rootContainer}>
        <View>
        <View style={styles.titleView}>
            <Icon name="clock" color={Colors.grey} size={responsiveFontSize(3)}/>
            <Text style={styles.activeText}>Past Doubts</Text>
          </View> 
       { 
      (auth.currentUser.uid === doubts.uid) ?
       <FlatList
      data={doubts}
      renderItem={({item}) => card(item)}
      keyExtractor={data => data.uid}
      >
      </FlatList> : <Text>There are no Past Doubts</Text>
       }
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
      flex: 1,
      width: responsiveWidth(80),
      // flexWrap: 'wrap'
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
      color:Colors.grey,
      width: responsiveWidth(50),
      flexWrap: 'wrap'
    },
    answerText2: {
      fontWeight: '700',
      fontSize: responsiveFontSize(2),
      color:Colors.grey,
      width: responsiveWidth(50),
      flexWrap: 'wrap',
      marginLeft: responsiveWidth(7)
    },
    nameView:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: responsiveHeight(1)
    }
  });
  