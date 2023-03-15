import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import {React, useState} from 'react'
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


export default function CreateDoubtScreen({route,navigation}) {
  const auth=getAuth();
  const db = getFirestore(app);

  const [subject, setSubject] = useState(null);
  const [description, setDescription] = useState(null);
  const [name, setName] = useState('');   
  const [enrollnmentNumber, setenrollnmentNumber] = useState('');   
  const [branch, setBranch] = useState('');   
  const [batchYear, setBatchYear] = useState('');   
  const [error, setError] = useState('');

  const addDoubt=()=> {
    if(!subject){
      setError('Please Enter Valid Subject!!')
    }
    else if(!description){
      setError('Please Enter detailed Description !!')
    }
    else{
      setError('');
      let date = new Date()
      let fDate =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear();
      showData();
      addDoc(collection(db, "doubts"),{
        subject: subject,
        description: description,
        // enrollnmentNumber: enrollnmentNumber,
        // batchYear: batchYear,
        // branch: branch,
        // name: name,
        facultyName: route.params.data.name,
        facultyId: route.params.data.id,
        date: fDate
      }).then(()=> {
        navigation.navigate('HomeScreen');
      })
    }
  }

  const [selected, setSelected] = useState("");
  const data = [
    { key: "1", value: "LOR", selected },
    { key: "2", value: "Exam Result" },
    { key: "3", value: "Bus Pass" },
  ];
  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.answerTitle}>{route.params.data.name}</Text>
        <Text style={styles.title}>Designation:</Text>
        <Text style={styles.answerTitle}>{route.params.data.position}</Text>
        </View>      
        </View>
        </Card>
      </View>
      <View style={styles.dropDownContainer}>
      <SelectList
          dropdownShown={false}
          boxStyles={styles.listBox}
          inputStyles={styles.list}
          setSelected={setSelected}
          data={data}
          search={false}
          placeholder="Select a Subject or Title"
          dropdownStyles={{
            backgroundColor: Colors.extralightgrey,
          }}
        />
      </View>
      <View>
        <Text style={styles.text}>Choose a subject from the frequently {"\n"} asked queries or make a custom one </Text>
      </View>
      <View style={styles.inputField}>
        <TextInputBoxField title={"Subject:"} placeholder={'Enter a Subject'} lines={1} enteredValue={subject} enteredValueHandler={(val) => setSubject(val)}/>
        <TextInputBoxField title={"Description:"} placeholder={'Describe your query/doubt'} lines={12} multiline={true} enteredValue={description} enteredValueHandler={(val) => setDescription(val)}/>
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
    </ScrollView>
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
        fontSize: responsiveFontSize(1.8)
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
        marginLeft: responsiveWidth(15),
        marginRight: responsiveWidth(15),
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
        marginBottom: 10
      }
})