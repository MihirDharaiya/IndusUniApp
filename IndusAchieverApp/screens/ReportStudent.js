import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
  import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid,
    Platform,
    AlertIOS,
  } from "react-native";
  import React, { useState } from "react";
  import Colors from "../constants/Colors";
  import Card from "../components/Card";
  import { getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  import { doc, setDoc, addDoc, collection } from "firebase/firestore";
  import { app } from "../firebase/firebase";
  import PrimaryButton from "../components/PrimaryButton";
  export default function ReportStudent({ route, navigation}) {
    const auth = getAuth();
    const db = getFirestore(app);
  
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");
    const reportStudent = async () => {
      if (reason.length < 50) {
        setError("Mention Reason in detail.");
      } else {
        await addDoc(collection(db, "reportedstudents"), {
          batchYear: route.params.data.batchYear,
          branch: route.params.data.branch,
          date: route.params.data.date,
          subject: route.params.data.subject,
          description: route.params.data.description,
          enrollnmentNumber: route.params.data.enrollnmentNumber,
          fid: route.params.data.fid,
          fname: route.params.data.fname,
          name: route.params.data.name,
          raised: "student",
          reason: reason,
        }).then(() => {
          setReason("");
  
          if (Platform.OS === "android") {
            ToastAndroid.show("Student in being Reported", ToastAndroid.SHORT);
          } else {
            AlertIOS.alert("Notified", "Student in being Reported");
          }
          navigation.navigate("HomeScreen");
        });
      }
    };
  
    return (
      <View style={styles.rootContainer}>
        <Card cardStyle={styles.card}>
          <Text style={styles.inputText}>Reason of Reporting:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Enter Your reply"}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={6}
              value={reason}
              onChangeText={(text) => setReason(text)}
            />
          </View>
          <PrimaryButton onPress={() => reportStudent()}>SEND</PrimaryButton>
        </Card>
        {error == "" ? null : (
          <View style={{ paddingTop: 10 }}>
            <Text
              style={{
                color: Colors.white,
                textAlign: "center",
                fontSize: responsiveFontSize(2.3),
              }}
            >
              {error}
            </Text>
          </View>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.extralightgrey,
    },
    alertInputTextContainer: {
      padding: responsiveWidth(3),
      alignItems: "center",
      marginBottom: 24,
    },
    alertInputText: {
      color: Colors.darkred,
      fontSize: responsiveFontSize(2.5),
      textAlign: "center",
      fontWeight: "500",
    },
    inputText: {
      fontSize: responsiveFontSize(2.3),
      color: Colors.darkred,
      marginVertical: 8,
    },
    inputContainer: {
      width: responsiveWidth(87),
    },
    card: {
      borderWidth: 1,
    },
    titleText: {
      fontSize: responsiveFontSize(2.3),
      fontWeight: "600",
      marginVertical: 4,
    },
    input: {
      borderWidth: 2,
      borderColor: Colors.extralightgrey,
      borderRadius: 10,
      fontSize: responsiveFontSize(2.3),
      textAlignVertical: "top",
      padding: 8,
      marginBottom: 16,
    },
  });