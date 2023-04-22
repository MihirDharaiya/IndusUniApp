import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  BackHandler,
} from "react-native";
import { React, useEffect, useState } from "react";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import BorderCard from "../components/BorderCard";
import TextInputBoxField from "../components/TextInputBoxField";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  getDocs,
  doc,
  collection,
  getDoc,
  where,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { app } from "../firebase.js";

export default function PastDoubts({ navigation }) {
  const auth = getAuth();
  const useruid = auth.currentUser.uid;
  const [doubts, setDoubts] = useState([]);
  const db = getFirestore(app);

  async function getDoubts() {
    const a = await getDoc(doc(db, "users", useruid));
    const enroll = a.data().enrollnmentNumber;
    const docRef = query(
      collection(db, "pastdoubts"),
      where("enrollnmentNumber", "==", enroll),
      orderBy("createdAt", "desc")
    );
    const un = onSnapshot(docRef, (querySnapshot) => {
      var arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setDoubts(arr);
    });
  }
  useEffect(() => {
    getDoubts();
    const backAction = () => {
      navigation.navigate("HomeScreen");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  function card(data) {
    return (
      <View>
        <BorderCard>
          <View style={styles.inputField}>
            <TextInputBoxField
              title={"Subject:"}
              editable={false}
              enteredValue={data.subject}
              multiline={true}
            ></TextInputBoxField>
            <TextInputBoxField
              title={"Reply:"}
              editable={false}
              enteredValue={data.reply}
              multiline={true}
              textStyle={{ color: Colors.darkred }}
            ></TextInputBoxField>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View style={styles.leftView}>
              <Text style={styles.headingText}>Raised On:</Text>
              <Text style={styles.answerText}>{data.raisedOn}</Text>
            </View>
            <View style={styles.rightView}>
              <Text style={styles.headingText}>Resolved On:</Text>
              <Text style={styles.answerText}>{data.resolvedOn}</Text>
            </View>
          </View>
          <View style={styles.facultyView}>
            <Text style={styles.facultyText}>
              <Text style={{ fontWeight: "700", color: Colors.black }}>
                By -{" "}
              </Text>{" "}
              {data.fname}
            </Text>
          </View>
        </BorderCard>
      </View>
    );
  }
  return (
    <View style={styles.rootContainer}>
      <View>
        <View style={styles.titleView}>
          <Icon name="clock" color={Colors.grey} size={responsiveFontSize(3)} />
          <Text style={styles.activeText}>Past Doubts</Text>
        </View>
        <FlatList
          data={doubts}
          renderItem={({ item }) => card(item)}
          keyExtractor={(data) => data.uid}
          style={{ marginBottom: responsiveHeight(10) }}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  activeText: {
    fontSize: responsiveFontSize(3),
    color: Colors.grey,
    fontWeight: "500",
    paddingLeft: responsiveWidth(2),
  },
  titleView: {
    paddingTop: responsiveHeight(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: responsiveHeight(2),
  },
  inputField: {
    flex: 1,
    width: responsiveWidth(80),
    // flexWrap: 'wrap'
  },
  leftView: {
    marginTop: responsiveHeight(1),
  },
  rightView: {
    marginTop: responsiveHeight(1),
    justifyContent: "center",
  },
  headingText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
  },
  answerText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
    color: Colors.lightgrey,
  },
  nameView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: responsiveHeight(1),
  },
  facultyView: {
    padding: 10,
    flexDirection: "row",
  },
  facultyText: {
    fontWeight: "700",
    fontSize: responsiveFontSize(2),
    color: Colors.navyblue,
    width: responsiveWidth(50),
    flexWrap: "wrap",
    textAlign: "center",
    alignItems: "center",
    flex: 1,
  },
  facultyHeading: {
    fontWeight: "700",
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    alignItems: "center",
  },
});
