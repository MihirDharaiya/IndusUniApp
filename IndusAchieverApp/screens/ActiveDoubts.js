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
  Pressable,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import BorderCard from "../components/BorderCard";
import Colors from "../constants/Colors";
import TextInputBoxField from "../components/TextInputBoxField";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  getFirestore,
  getDoc,
  doc,
  query,
  onSnapshot,
  getDocs,
  collection,
  where,
  deleteDoc,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { getAuth, User } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";

export default function ActiveDoubts({ navigation }) {
  const isFocused = useIsFocused();
  const [doubt, setDoubt] = useState([]);
  const [resolvedDoubt, setResolvedDoubt] = useState([]);
  const auth = getAuth();
  const useruid = auth.currentUser.uid;
  const db = getFirestore(app);

  const deleteDoubt = async (data) => {
    const docRef = doc(db, "activedoubts", data.doubtId);
    await deleteDoc(docRef).then(() => {
      navigation.navigate("HomeScreen");
    });
  };
  const moveToPastDoubt = async (data, satisfy) => {
    // console.log(typeof data.doubtId);
    let tempDate = new Date();
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    const docRef = doc(db, "resolveddoubts", data.doubtId);
    await deleteDoc(docRef);
    await addDoc(collection(db, "pastdoubts"), {
      raisedOn: data.raisedOn,
      batchYear: data.batchYear,
      resolvedOn: fDate,
      subject: data.subject,
      description: data.description,
      enrollnmentNumber: data.enrollnmentNumber,
      fid: data.fid,
      fname: data.fname,
      reply: data.reply,
      createdAt: data.createdAt,
      satisfy: satisfy === true ? "yes" : "no",
    }).then(() => {
      navigation.navigate("PastDoubts");
    });
  };

  const getResolvedDoubt = async () => {
    const a = await getDoc(doc(db, "users", useruid));
    const enroll = a.data().enrollnmentNumber;
    const doubts = collection(db, "resolveddoubts");
    const q = query(
      doubts,
      where("enrollnmentNumber", "==", enroll),
      orderBy("createdAt", "desc")
    );
    const un = onSnapshot(q, (querySnapshot) => {
      var arr = [];
      var arrId = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
        arrId.push(doc.id);
      });
      for (let i = 0; i < arr.length; i++) {
        arr[i]["doubtId"] = arrId[i];
      }
      setResolvedDoubt(arr);
      console.log(arr);
    });
  };

  const getUnResolvedDoubt = async () => {
    const a = await getDoc(doc(db, "users", useruid));
    const enroll = a.data().enrollnmentNumber;
    const doubts = collection(db, "activedoubts");
    const q = query(
      doubts,
      where("enrollnmentNumber", "==", enroll),
      orderBy("createdAt", "desc")
    );
    const un = onSnapshot(q, (querySnapshot) => {
      var arr = [];
      var arrId = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
        arrId.push(doc.id);
      });
      for (let i = 0; i < arr.length; i++) {
        arr[i]["doubtId"] = arrId[i];
      }
      setDoubt(arr);
      console.log(arr);
    });
  };
  useEffect(() => {
    getResolvedDoubt();
    getUnResolvedDoubt();
    const backAction = () => {
      navigation.navigate("HomeScreen");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [isFocused]);

  function card(data, resolveDoubt) {
    return (
      <View>
        <BorderCard>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Faculty Name:</Text>
            <Text style={styles.headingText}>Raised On:</Text>
          </View>
          <View style={styles.answerView}>
            <Text style={styles.answerText}>{data.fname}</Text>
            <Text style={styles.answerText}>{data.raisedOn}</Text>
          </View>
          <View style={styles.inputField}>
            <TextInputBoxField
              title={"Subject:"}
              editable={false}
              enteredValue={data.subject}
            ></TextInputBoxField>
            <TextInputBoxField
              title={"Description:"}
              editable={false}
              enteredValue={data.description}
              multiline={true}
            ></TextInputBoxField>
            {resolveDoubt ? (
              <TextInputBoxField
                title={"Reply:"}
                editable={false}
                enteredValue={data.reply}
                multiline={true}
              ></TextInputBoxField>
            ) : null}
          </View>
          <View style={styles.outerView}>
            {resolveDoubt ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  flex: 1,
                }}
              >
                <Pressable
                  onPress={() => {
                    moveToPastDoubt(data, false);
                  }}
                >
                  <View style={styles.textIconView}>
                    <Icon
                      name="times-circle"
                      color={Colors.darkred}
                      size={responsiveFontSize(2.2)}
                    />
                    <Text
                      style={{
                        color: Colors.darkred,
                        fontSize: responsiveFontSize(2.3),
                        fontWeight: "500",
                        paddingLeft: responsiveWidth(1),
                      }}
                    >
                      Not Satisfied
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    moveToPastDoubt(data, true);
                  }}
                >
                  <View style={styles.textIconView}>
                    <Icon
                      name="check-circle"
                      color={Colors.green}
                      size={responsiveFontSize(2.2)}
                    />
                    <Text
                      style={{
                        color: Colors.green,
                        fontSize: responsiveFontSize(2.3),
                        fontWeight: "500",
                        paddingLeft: responsiveWidth(1),
                      }}
                    >
                      Satisfied
                    </Text>
                  </View>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  deleteDoubt(data);
                }}
              >
                <View style={styles.textIconView}>
                  <Icon
                    name="times-circle"
                    color={Colors.darkred}
                    size={responsiveFontSize(2.2)}
                  />
                  <Text
                    style={{
                      color: Colors.darkred,
                      fontSize: responsiveFontSize(2.3),
                      fontWeight: "500",
                      paddingLeft: responsiveWidth(1),
                    }}
                  >
                    Dismiss
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        </BorderCard>
      </View>
    );
  }
  return (
    <ScrollView style={styles.rootContainer}>
      <View>
        <View style={styles.titleView}>
          <Icon
            name="user-clock"
            color={Colors.grey}
            size={responsiveFontSize(3)}
          />
          <Text style={styles.activeText}>Active Doubts</Text>
        </View>
        <View>
          <FlatList
            extraData={resolvedDoubt}
            data={resolvedDoubt}
            renderItem={({ item }) => card(item, true)}
            keyExtractor={(data) => data.doubtId}
          ></FlatList>
        </View>
        <View style={styles.line}></View>
        <View>
          <FlatList
            extraData={doubt}
            data={doubt}
            renderItem={({ item }) => card(item, false)}
            keyExtractor={(data) => data.doubtId}
          ></FlatList>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: responsiveHeight(0.5),
    paddingLeft: responsiveWidth(0.6),
    paddingRight: responsiveWidth(0.3),
  },
  headingText: {
    fontWeight: "700",
    fontSize: responsiveFontSize(2),
  },
  answerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: responsiveWidth(0.6),
    paddingRight: responsiveWidth(0.3),
    paddingBottom: responsiveHeight(1),
  },
  answerText: {
    fontWeight: "700",
    fontSize: responsiveFontSize(2),
    color: Colors.grey,
  },
  inputField: {
    flex: 1,
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
  textIconView: {
    flexDirection: "row",
    padding: responsiveWidth(0.5),
    alignItems: "center",
  },
  outerView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 10,
  },
  line: {
    height: 1,
    backgroundColor: Colors.grey,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.21,
    shadowRadius: 4.65,
    elevation: 3,
    width: "100%",
    marginVertical: responsiveHeight(1),
    opacity: 0.5,
  },
});
