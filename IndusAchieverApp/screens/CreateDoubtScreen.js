import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ToastAndroid,
  Platform,
  AlertIOS,
  KeyboardAvoidingView,
} from "react-native";
import { React, useState, useEffect } from "react";
import Card from "../components/Card";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";
import TextInputBoxField from "../components/TextInputBoxField";
import PrimaryButton from "../components/PrimaryButton";
import { SelectList } from "react-native-dropdown-select-list";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SuccessPage from "./SuccessPage";

export default function CreateDoubtScreen({ route, navigation }) {
  const data = [
    { key: "1", value: "NOC for Internship", selected },
    { key: "2", value: "Subject related" },
    { key: "3", value: "CIE Related" },
    { key: "4", value: "Internship related" },
    { key: "5", value: "Guidance for project career or etc" },
    { key: "1", value: "Asking for LOR" },
    { key: "6", value: "Other" },
  ];
  const dataClone = {
    NOCforInternship: "1",
    Subjectrelated: "2",
    CIERelated: "3",
    Internshiprelated: "4",
    Guidanceforprojectcareeroretc: "5",
    AskingforLOR: "1",
    Other: "6",
  };

  function priority(value) {
    const a = value.replace(/\s/g, "");
    return dataClone[a];
  }
  const auth = getAuth();
  const db = getFirestore(app);

  const [subject, setSubject] = useState("");
  const [otherSubject, setOtherSubject] = useState("");
  const [description, setDescription] = useState("");
  const [enrollnmentNumber, setenrollnmentNumber] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState([]);
  const [isOtherSubject, setIsOtherSubject] = useState(false);
  const profile = { uri: route.params.data.profileImg };
  const default_prof = require('../assets/images/Profile.png');

  useEffect(() => { }, []);

  const addDoubt = async () => {
    let user = await AsyncStorage.getItem("users");
    user = JSON.parse(user);
    setenrollnmentNumber(user.enrollnmentNumber);
    if (description.length < 50) {
      setError("Please Enter detailed Description !!");
      if (!description) {
        setError("Description cannot be empty !!");
      }
    } else {
      setError("");
      let tempDate = new Date();
      let fDate =
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
      addDoc(collection(db, "activedoubts"), {
        subject: subject === "Other" ? otherSubject : subject,
        description: description,
        fname: route.params.data.fname,
        fid: route.params.data.fid,
        raisedOn: fDate,
        uid: auth.currentUser.uid,
        priority: priority(subject),
        enrollnmentNumber: user.enrollnmentNumber,
        batchYear: user.batchYear,
        branch: user.branch,
        name: user.name,
        createdAt: serverTimestamp(),
      }).then(() => {
        if (Platform.OS === "android") {
          ToastAndroid.show("Doubt has been created", ToastAndroid.SHORT);
        } else {
          // AlertIOS.alert("Raised", "Doubt has been created");
        }
        navigation.navigate("SuccessPage")
      });
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <Card>
          <View style={styles.titleContainer}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.profileImg}
                source={route.params.data.profileImg === "" ? default_prof : profile}
              />
            </View>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.title}>Name:</Text>
                <Text style={styles.answerTitle}>{route.params.data.fname}</Text>
              </View>
              <View>
                <Text style={styles.title}>Designation:</Text>
                <Text style={styles.answerTitle}>
                  {route.params.data.fposition}
                </Text>
              </View>
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
        <Text style={styles.text}>
          Choose a subject from the frequently {"\n"} asked queries or make a
          custom one{" "}
        </Text>
      </View>
      <View style={styles.inputField}>
        {subject !== "Other" ? (
          <TextInputBoxField
            title={"Subject:"}
            placeholder={"Enter a Subject"}
            lines={1}
            editable={false}
            enteredValue={subject}
          />
        ) : (
          <TextInputBoxField
            title={"Subject:"}
            placeholder={"Enter a Subject"}
            lines={1}
            editable={true}
            enteredValue={otherSubject}
            enteredValueHandler={(val) => setOtherSubject(val)}
          />
        )}

        <TextInputBoxField
          title={"Description:"}
          placeholder={"Describe your query/doubt"}
          lines={8}
          multiline={true}
          enteredValue={description}
          enteredValueHandler={(val) => setDescription(val)}
        />
      </View>
      {error == "" ? null : (
        <View style={{ paddingTop: 10 }}>
          <Text style={{ color: Colors.red, textAlign: "center" }}>
            {error}
          </Text>
        </View>
      )}
      <View style={styles.buttonStyle}>
        <PrimaryButton
          onPress={() => {
            addDoubt();
          }}
        >
          Submit
        </PrimaryButton>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textContainer: {
    justifyContent: 'center',
  },
  imgContainer: {
    margin: 10,
  },
  profileImg: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(30) / 2,
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1,
  },
  title: {
    flex: 1,
    fontWeight: "800",
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
  },
  answerTitle: {
    fontWeight: "500",
    marginBottom: responsiveHeight(1),
    color: Colors.grey,
    fontSize: responsiveFontSize(2.3),
    width: responsiveWidth(50),
    flexWrap: "wrap",
  },
  text: {
    color: Colors.grey,
    textAlign: "center",
    padding: 20,
    fontSize: responsiveFontSize(2.3),
  },
  titleText: {
    textAlign: "left",
    paddingLeft: responsiveWidth(5.2),
  },
  inputField: {
    margin: 10,
  },
  buttonStyle: {
    marginLeft: responsiveWidth(20),
    marginRight: responsiveWidth(20),
  },
  listBox: {
    borderColor: Colors.blue,
    borderWidth: 2.5,
  },
  list: {
    fontSize: responsiveFontSize(2.3),
    paddingRight: 20,
    color: Colors.blue,
    fontWeight: "700",
  },
  dropDownContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textS: {
    textAlign: "center",
    color: Colors.green,
    fontSize: responsiveFontSize(3.5),
    fontWeight: "600",
  },
  image2: {
    width: responsiveWidth(80),
    height: responsiveWidth(65),
  },
  containerImage: {
    alignItems: "center",
    marginVertical: responsiveHeight(5),
  },
});
