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
import { doc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { app } from "../firebase";
import SecondaryButton from "../components/SecondaryButton";
export default function ReportStudent({ route, navigation }) {
  const auth = getAuth();
  const db = getFirestore(app);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const ReplyToDoubt = async () => {
    if (reply.length < 10) {
      setError("Mention Reason in detail.");
    } else {
      const docRef = doc(db, "activedoubts", route.params.data.uid);
      await deleteDoc(docRef);
      await addDoc(collection(db, "resolveddoubts"), {
        date: route.params.data.date,
        subject: route.params.data.subject,
        description: route.params.data.description,
        enrollnmentNumber: route.params.data.enrollnmentNumber,
        fid: route.params.data.fid,
        fname: route.params.data.fname,
        name: route.params.data.name,
        batchYear: route.params.data.batchYear,
        reply: reply,
      }).then(() => {
        setReply("");

        if (Platform.OS === "android") {
          ToastAndroid.show("Response has been saved", ToastAndroid.SHORT);
        } else {
          AlertIOS.alert("Stored", "Response has been saved");
        }
        navigation.navigate("Home");
      });
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Card cardStyle={styles.card}>
        <Text style={styles.inputText}>Your Reply:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Enter Your reply:"}
            autoCapitalize="none"
            multiline={true}
            numberOfLines={6}
            value={reply}
            onChangeText={(text) => setReply(text)}
          />
        </View>
        <SecondaryButton onPress={() => ReplyToDoubt()}>SEND</SecondaryButton>
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
