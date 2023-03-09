import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import React from 'react'
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

export default function CreateDoubtScreen() {
  const [selected, setSelected] = React.useState("");
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
        <Text style={styles.answerTitle}>Rahul Bhatt</Text>
        <Text style={styles.title}>Designation:</Text>
        <Text style={styles.answerTitle}>Assistant Professor</Text>
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
        <TextInputBoxField title={"Subject:"} placeholder={'Enter a Subject'} lines={1}/>
        <TextInputBoxField title={"Description:"} placeholder={'Describe your query/doubt'} lines={12} multiline={true}/>
      </View>
      <View style={styles.buttonStyle}>
      <PrimaryButton>Submit</PrimaryButton>
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