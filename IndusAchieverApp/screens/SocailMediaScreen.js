import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import SecondaryTextInputField from "../components/SecondaryTextInputField";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";
import SecondaryButton from "../components/SecondaryButton";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { app } from "../firebase.js";
import { HashtagInput } from "react-native-element-textinput";
export default function SocailMediaScreen({ navigation }) {
  const auth = getAuth();
  const db = getFirestore(app);
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setText(event.target[0].value);
  };

  const dataExist = async () => {
    const gitLink = "https://github.com/";
    const linLink = "https://www.linkedin.com/in/";
    const twitLink = "https://twitter.com/";
    const instLink = "https://www.instagram.com/";
    const col = doc(db, "users", auth.currentUser.uid);
    const snap = await getDoc(col);
    setGithub(snap.data().github.replace(gitLink, ""));
    setLinkedIn(snap.data().linkedIn.replace(linLink, ""));
    setTwitter(snap.data().twitter.replace(twitLink, ""));
    setInstagram(snap.data().instagram.replace(instLink, ""));
    setValue(snap.data().tags);
  };

  useEffect(() => {
    dataExist();
  }, []);
  const addLinks = async () => {
    const user = doc(db, "users", auth.currentUser.uid);
    const gitLink = "https://github.com/";
    const linLink = "https://www.linkedin.com/in/";
    const twitLink = "https://twitter.com/";
    const instLink = "https://www.instagram.com/";
    updateDoc(user, {
      github: github.length < 1 ? "" : gitLink + github,
      linkedIn: linkedIn.length < 1 ? "" : linLink + linkedIn,
      instagram: instagram.length < 1 ? "" : instLink + instagram,
      twitter: twitter.length < 1 ? "" : twitLink + twitter,
      tags: value,
    }).then(() => {
      if (Platform.OS === "android") {
        ToastAndroid.show("Details Have Been Saved", ToastAndroid.SHORT);
      } else {
        // AlertIOS.alert("Raised", "Doubt has been created");
      }
      setGithub("");
      setInstagram("");
      setLinkedIn("");
      setTwitter("");
      navigation.navigate("Profile");
    });
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
          enteredValue={github}
          enteredValueHandler={(val) => setGithub(val)}
        ></SecondaryTextInputField>
        <SecondaryTextInputField
          iconVisible={true}
          iconName={"linkedin"}
          size={responsiveFontSize(3)}
          placeholder={"LinkedIn ID"}
          keyboardType="email"
          enteredValue={linkedIn}
          enteredValueHandler={(val) => setLinkedIn(val)}
        ></SecondaryTextInputField>
        <SecondaryTextInputField
          iconVisible={true}
          iconName={"instagram"}
          size={responsiveFontSize(3)}
          placeholder={"Instagram ID"}
          keyboardType="email"
          enteredValue={instagram}
          enteredValueHandler={(val) => setInstagram(val)}
        ></SecondaryTextInputField>
        <SecondaryTextInputField
          iconVisible={true}
          iconName={"twitter"}
          size={responsiveFontSize(3)}
          placeholder={"Twitter ID"}
          keyboardType="email"
          enteredValue={twitter}
          enteredValueHandler={(val) => setTwitter(val)}
        ></SecondaryTextInputField>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.suggestionView}>
          <Text style={styles.suggestionText}>Add Skills</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            padding: responsiveWidth(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HashtagInput
            data={value}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            hashtagStyle={styles.hashtagStyle}
            hashtagTextStyle={styles.hashtagTextStyle}
            placeholder="Hashtag..."
            placeholderTextColor="gray"
            onChangeValue={(value) => {
              setValue(value);
            }}
          />
        </View>
        <View style={styles.secondButton}>
          <SecondaryButton
            iconVisible={true}
            iconName="bookmark"
            size={responsiveFontSize(3)}
            color={Colors.blue}
            textStyle={{ color: Colors.blue }}
            onPress={() => {
              addLinks();
            }}
          >
            Save
          </SecondaryButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  textStyle: {
    textAlign: "center",
    padding: 20,
    fontSize: responsiveFontSize(3),
    color: Colors.grey,
  },
  image2: {
    justifyContent: "center",
    alignItems: "center",
    height: responsiveHeight(30),
    width: responsiveHeight(40),
  },
  suggestionText: {
    color: Colors.navyblue,
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
  },
  suggestionView: {
    margin: 10,
    alignItems: "center",
  },
  inputField: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  field: {
    paddingBottom: 30,
  },
  skillSection: {
    flexDirection: "row",
  },
  altField: {
    width: responsiveWidth(70),
    padding: 15,
  },
  altButton: {
    width: responsiveWidth(30),
    height: responsiveHeight(10),
  },
  secondButton: {
    width: responsiveWidth(35),
    height: responsiveHeight(20),
    marginTop: responsiveHeight(3),
  },

  input: {
    alignItems: "center",
    marginHorizontal: 16,
    height: 55,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexWrap: "wrap",
  },
  inputStyle: { fontSize: 16 },
  labelStyle: { fontSize: 14 },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
  hashtagStyle: {
    borderWidth: 0,
    borderRadius: 16,
    padding: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  hashtagTextStyle: {
    fontSize: 16,
  },
});
