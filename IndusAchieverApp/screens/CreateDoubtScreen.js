import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid,
  Platform,
  AlertIOS,KeyboardAvoidingView} from 'react-native'
import {React, useState, useEffect} from 'react'
import Card from "../components/Card";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
import Colors from '../constants/Colors';
import TextInputBoxField from '../components/TextInputBoxField';
import PrimaryButton from '../components/PrimaryButton';
import { SelectList } from "react-native-dropdown-select-list";
import { getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc, addDoc, collection} from 'firebase/firestore';
import {app} from '../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';



export default function CreateDoubtScreen({route,navigation}) {
  
  const data = 
    [
      { key: "1", value: "NOC for Internship", selected },
      { key: "2", value: "Subject related" },
      { key: "3", value: "CIE Related" },
      { key: "4", value: "Internship related" },
      { key: "5", value: "Guidance for project career or etc" },
      { key: "1", value: "Asking for LOR"},
      { key: "6", value: "Other" },
    ];
    const dataClone = 
    {
      NOCforInternship: "1",
      Subjectrelated: "2", 
      CIERelated: "3", 
      Internshiprelated: "4",
      Guidanceforprojectcareeroretc: "5", 
      AskingforLOR: "1",
      Other: "6"
    };

    function priority(value){
      const a = value.replace(/\s/g, '')
      // console.log(dataClone[a]);
      return dataClone[a];
    }
  const auth=getAuth();
  const db = getFirestore(app);

  const [subject, setSubject] = useState("");
  const [otherSubject, setOtherSubject] = useState("");
  const [description, setDescription] = useState("");
  const [enrollnmentNumber, setenrollnmentNumber] = useState("");  
  const [batchYear, setBatchYear] = useState('');     
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]);
  const [isOtherSubject, setIsOtherSubject] = useState(false);
  // const [data, setData] = useState([]);


  // const getPriorityData = async ()=> {
  //   let user = await AsyncStorage.getItem('users');
  //   user = JSON.parse(user);
  //   console.log(typeof user, user)
  //   setenrollnmentNumber(user.enrollnmentNumber);
  //   setBatchYear(user.batchYear);
  //   // console.log(user.enrollnmentNumber);
  //   // console.log(enrollnmentNumber);
  //   // console.log(batchYear);
  //   let date = new Date()
  //   let currentYear = date.getFullYear();
  //   // let prior = (currentYear - batchYear)-1;
  //   // if(prior === 3){
  //   //   await setData(yearOne);
  //   //   console.log("In IF");
  //   // }
  //   // console.log(prior);
  //   // const value = Priority[prior]
  //   // setData(Priority[prior])
  //   // console.log(value);
  // }
useEffect(()=>{
    // getPriorityData()

},[])

  const addDoubt=async()=> {
    // if(!subject){
    //   setError('Please Select a Valid Subject !!')
    // }
    // else if(otherSubject.length < 15){
    //   setError('Subject is too small !!')
      // if(!otherSubject){
      //   setError('Please Enter a Valid Subject in Detail !!')
      // }
    // }
    let user = await AsyncStorage.getItem('users');
    user = JSON.parse(user);
    setenrollnmentNumber(user.enrollnmentNumber);
  // console.log(typeof user, user)
    if(description.length < 50){
      setError('Please Enter detailed Description !!')
      if(!description){
        setError("Description cannot be empty !!")
      }
    }
    else{
      setError('');
      let date = new Date()
      let currentYear = date.getFullYear();
      addDoc(collection(db, "activedoubts"),{
        subject: subject === "Other" ? otherSubject : subject,
        description: description,
        fname: route.params.data.fname,
        fid: route.params.data.fid,
        date: date.toDateString(),
        uid: auth.currentUser.uid,
        priority: priority(subject),
        enrollnmentNumber: user.enrollnmentNumber,
        batchYear: user.batchYear,
        branch: user.branch,
        name: user.name,
      }).then(()=> {
        if (Platform.OS === "android") {
          ToastAndroid.show("Doubt has been created", ToastAndroid.SHORT);
        } else {
          // AlertIOS.alert("Raised", "Doubt has been created");
        }
        navigation.navigate('HomeScreen');
      })
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
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
        <Text style={styles.answerTitle}>{route.params.data.fname}</Text>
        <Text style={styles.title}>Designation:</Text>
        <Text style={styles.answerTitle}>{route.params.data.fposition}</Text>
        </View>      
        </View>
        </Card>
      </View>
      <View style={styles.dropDownContainer}>
      <SelectList
          dropdownShown={false}
          boxStyles={styles.listBox}
          inputStyles={styles.list}
          data={data}
          save="value"
          setSelected={(val) => setSubject(val)}
          value={selected}
          search={false}
          placeholder="Select a Subject or Title"
          dropdownStyles={{
            backgroundColor: Colors.white,
          }}
        />
      </View>
      <View>
        <Text>{dataClone.subject}</Text>
        <Text style={styles.text}>Choose a subject from the frequently {"\n"} asked queries or make a custom one </Text>
      </View>
      <View style={styles.inputField}>
        {/* {subject === "Other" ? setIsOtherSubject(true) :setIsOtherSubject(false) } */}
        {subject !== "Other" ? 
        <TextInputBoxField 
        title={"Subject:"} 
        placeholder={"Enter a Subject"} 
        lines={1} 
        editable={false}
        enteredValue={subject} 
        /> :
        <TextInputBoxField 
        title={"Subject:"} 
        placeholder={'Enter a Subject'} 
        lines={1} 
        editable={true}
        enteredValue={otherSubject} 
        enteredValueHandler={(val) => setOtherSubject(val)}/>
        }
        
        <TextInputBoxField 
        title={"Description:"} 
        placeholder={'Describe your query/doubt'} 
        lines={12} 
        multiline={true} 
        enteredValue={description} 
        enteredValueHandler={(val) => setDescription(val)}/>
      </View>
      {
        error==''?null:(<View style={{paddingTop: 10}}>
          <Text style={{color: Colors.red, textAlign: 'center'}}>
            {error}
          </Text>
        </View>)
      }
      <View style={styles.buttonStyle}>
      <PrimaryButton
      onPress={()=> {addDoubt()}}
      >Submit</PrimaryButton>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: Colors.white
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
        fontSize: responsiveFontSize(1.8),
        width: responsiveWidth(50),
        flexWrap: 'wrap'
      },
      textContainer:{
        padding: 6,
        justifyContent: 'flex-end'
      },
      text: {
        color: Colors.grey,
        textAlign: 'center',
        padding: 20,
        fontSize: responsiveFontSize(2.3)
      },
      titleText: {
        textAlign: 'left',
        paddingLeft: responsiveWidth(5.2)
      },
      inputField: {
        margin: 10,
      },
      buttonStyle:{
        marginLeft: responsiveWidth(20),
        marginRight: responsiveWidth(20)
      },
      listBox: {
        borderColor: Colors.blue,
        borderWidth: 2.5,
      },
      list: {
        fontSize: responsiveFontSize(2.3),
        paddingRight: 20,
        color: Colors.blue,
        fontWeight: '700'
      },
      dropDownContainer: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }
})