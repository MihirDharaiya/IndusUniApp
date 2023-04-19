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
  Image,
  Pressable,
  ToastAndroid,
  Platform,
  AlertIOS,
  BackHandler,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import {
  query,
  getDocs,
  getDoc,
  doc,
  getFirestore,
  where,
  collection,
  limit,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { useIsFocused, useRoute } from "@react-navigation/native";
export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const auth = getAuth();
  const route = useRoute();
  const useruid = auth.currentUser.uid;
  const db = getFirestore(app);
  const [fid, setFid] = useState("");
  const [wholeData, setWholeData] = useState([]);
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [generateDoubt, setGenerateDoubt] = useState(true);
  useEffect(() => {
    if (isFocused) {
      setNoData(false);
      setGenerateDoubt(true);
      getDoubtData();
      if (data.length === 0) {
        setNoData(true);
      }
    }
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to Exit the App?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isFocused]);
  const getCurrentUser = async () => {
    const a = await getDoc(doc(db, "faculty", useruid));
    setFid(a.data().fid);
  };
  const getDoubtData = async () => {
    setGenerateDoubt(false);
    getCurrentUser();
    const doubts = collection(db, "activedoubts");
    for (let i = 1; i <= 6; i++) {
      i = i.toString();
      const q = query(
        doubts,
        where("fid", "==", fid),
        where("priority", "==", i),
        limit(1)
      );
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setData(doc.data());
            const clone = doc.data();
            clone["uid"] = doc.id;
            setWholeData(clone);
            setNoData(false);
            setGenerateDoubt(false);
          });
          break;
        } else {
          setData([]);
          setNoData(true);
          setGenerateDoubt(false);
        }
      } catch (e) {
        console.log("Error getting cached document:", e);
      }
    }
  };
  const RejectDoubt = async () => {
    const docRef = doc(db, "activedoubts", wholeData.uid);
    await deleteDoc(docRef);
    await addDoc(collection(db, "resolveddoubts"), {
      date: data.date,
      subject: data.subject,
      description: data.description,
      enrollnmentNumber: data.enrollnmentNumber,
      fid: data.fid,
      fname: data.fname,
      name: data.name,
      reply: "REJECTED",
    }).then(() => {
      if (Platform.OS === "android") {
        ToastAndroid.show("Response has been saved", ToastAndroid.SHORT);
      } else {
        AlertIOS.alert("Stored", "Response has been saved");
      }
      setData([]);
      setWholeData([]);
      getDoubtData();
    });
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <Card>
        {(noData && !generateDoubt) || (!noData && generateDoubt) ? (
          <>
            <View style={styles.noDoubtContainer}>
              <Image
                style={styles.noDoubtImg}
                source={require("../assets/images/NoDoubtRight.png")}
              ></Image>
              {!noData && generateDoubt ? (
                <>
                  <Text style={styles.noDoubtText}>
                    Press the Generate button to get new Doubts.
                  </Text>
                </>
              ) : noData && !generateDoubt ? (
                <>
                  <Text style={styles.noDoubtText}>
                    Feels Like Everyone Is Doing Well In College. 👏🏻 🥳
                  </Text>
                </>
              ) : null}
            </View>
          </>
        ) : (
          <>
            <View style={styles.dateContainer}>
              <View style={styles.textContainer}>
                <Text style={[styles.hintText, { fontWeight: "600" }]}>
                  Raised on:
                </Text>
                <Text style={[styles.text, { fontWeight: "600" }]}>
                  {data.raisedOn}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  navigation.navigate("Report Student", { data: wholeData });
                }}
              >
                <View style={styles.reportContainer}>
                  <Icon
                    name="flag"
                    size={responsiveFontSize(2)}
                    color={Colors.red}
                  />
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: "400",
                        color: Colors.red,
                        fontSize: responsiveFontSize(1.6),
                      },
                    ]}
                  >
                    Report
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.imgContainer}>
                <Image
                  style={styles.profileImg}
                  source={require("../assets/images/Profile.png")}
                />
              </View>
              <View style={styles.studentsContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.hintText}>Name:</Text>
                  <Text style={styles.text}>{data.name}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.hintText}>Enroll No.:</Text>
                  <Text style={styles.text}>{data.enrollnmentNumber}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.hintText}>Branch:</Text>
                  <Text style={styles.text}>
                    {data.branch}, {data.batchYear}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.subjectContainer}>
              <Text style={styles.hintsubjectText}>Subject:</Text>
              <Text style={styles.subjectText}>{data.subject}</Text>
            </View>

            <View style={styles.descContainer}>
              <Text style={styles.descHintText}>Description:</Text>
              <View style={styles.textScroll}>
                <Text style={styles.descText}>{data.description}</Text>
              </View>
            </View>

            <View style={styles.optionsOuterContainer}>
              <Pressable onPress={() => RejectDoubt()}>
                <View style={styles.reportInnerContainer}>
                  <Icon
                    name="times-circle"
                    size={responsiveFontSize(3)}
                    color={Colors.red}
                  />
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: "600",
                        color: Colors.red,
                        fontSize: responsiveFontSize(2.3),
                      },
                    ]}
                  >
                    Reject
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate("Answer Doubt", { data: wholeData });
                }}
              >
                <View style={styles.reportInnerContainer}>
                  <Icon
                    name="check-circle"
                    size={responsiveFontSize(3)}
                    color={Colors.green}
                  />
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: "600",
                        color: Colors.green,
                        fontSize: responsiveFontSize(2.3),
                      },
                    ]}
                  >
                    Accept
                  </Text>
                </View>
              </Pressable>
            </View>
          </>
        )}
      </Card>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          iconVisible={true}
          iconName={"redo"}
          size={responsiveFontSize(3.5)}
          onPress={() => getDoubtData()}
          viewStyle={styles.generateBtn}
        >
          Generate Doubt
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  noDoubtContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(50),
  },
  noDoubtImg: {
    width: "100%",
    marginBottom: responsiveHeight(4),
  },
  noDoubtText: {
    marginVertical: 16,
    color: Colors.navyblue,
    fontSize: responsiveFontSize(2.5),
    fontWeight: "600",
    textAlign: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  reportContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgContainer: {
    margin: 8,
    marginVertical: 16,
  },
  profileImg: {
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: 25,
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: responsiveHeight(1.5),
    flexWrap: "wrap",
    width: responsiveWidth(60),
  },
  hintText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "300",
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "400",
    color: Colors.lightgrey,
    marginLeft: 4,
  },
  subjectContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hintsubjectText: {
    marginRight: 8,
    fontSize: responsiveFontSize(2),
    fontWeight: "400",
  },
  subjectText: {
    flexShrink: 1,
    fontSize: responsiveFontSize(2),
    fontWeight: "400",
    color: Colors.blue,
  },
  descContainer: {
    marginBottom: 1,
  },
  descHintText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "500",
    marginVertical: 4,
  },
  textScroll: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10,
    padding: responsiveWidth(2),
  },
  descText: {
    fontSize: responsiveFontSize(2),
    textAlign: "left",
  },
  optionsOuterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  reportInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  generateBtn: {
    width: responsiveWidth(60),
  },
});
