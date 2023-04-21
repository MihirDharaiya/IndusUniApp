import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  Linking,
} from "react-native";
import Card from "../components/Card";
import { useIsFocused } from "@react-navigation/native";
import {
  getFirestore,
  getDocs,
  doc,
  collection,
  getDoc,
  limit,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import SecondaryButton from "../components/SecondaryButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import sendEmail from "../components/SendEmail";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import PrimaryButton from "../components/PrimaryButton";

const FacultyList = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [faculty, setFaculty] = useState([]);
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [name, setName] = useState("");
  const [enrollnmentNumber, setEnrollnmentNumber] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [branch, setBranch] = useState("");

  const db = getFirestore(app);
  const auth = getAuth();
  const useruid = auth.currentUser.uid;
  async function Other() {
    const a = await getDoc(doc(db, "users", useruid));
    setBatchYear(a.data().batchYear);
    setName(a.data().name);
    setBranch(a.data().branch);
    setEnrollnmentNumber(a.data().enrollnmentNumber);
  }
  async function getFacultyBranch() {
    const a = await getDoc(doc(db, "users", useruid));
    const branch = a.data().branch;
    const docRef = query(
      collection(db, "faculty"),
      where("fbranch", "==", branch)
    );
    const un = onSnapshot(docRef, (querySnapshot) => {
      var arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setFaculty(arr);
    });
    // const docSnap = await getDocs(docRef);
    // var arr = [];
    // docSnap.forEach((doc) => {
    //   arr.push(doc.data());
    // });
    // setFaculty(arr);
  }

  async function getFaculty() {
    const a = await getDoc(doc(db, "users", useruid));
    const docRef = query(collection(db, "faculty"));
    const un = onSnapshot(docRef, (querySnapshot) => {
      var arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setFaculty(arr);
    });
    // const docSnap = await getDocs(docRef);
    // var arr = [];
    // docSnap.forEach((doc) => {
    //   arr.push(doc.data());
    // });
    // setFaculty(arr);
  }
  useEffect(() => {
    getFacultyBranch();
    setClick1(true);
  }, [isFocused]);

  function card(data) {
    const prof = data.profileImg;
    const profile = { uri: data.profileImg };
    const default_prof = require("../assets/images/Profile.png");
    let icon = prof === "" ? default_prof : profile;
    return (
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("Add Doubt Details", { data: data });
          }}
        >
          <Card>
            <View style={styles.titleContainer}>
              <View style={styles.imgContainer}>
                <Image style={styles.profileImg} source={icon} />
              </View>
              <View style={styles.textContainer}>
                <View style={{ paddingBottom: 8 }}>
                  <Text style={styles.title}>Name:</Text>
                  <Text style={styles.answerTitle}>{data.fname}</Text>
                </View>
                <View style={{ paddingBottom: 8 }}>
                  <Text style={styles.title}>Designation:</Text>
                  <Text style={styles.answerTitle}>{data.fposition}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Branch: </Text>
                  <Text style={styles.answerTitle}>{data.fbranch}</Text>
                </View>
              </View>
            </View>
          </Card>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.conatiner}>
      <View style={styles.titleView}>
        <Icon
          name="user-tie"
          color={Colors.grey}
          size={responsiveFontSize(3)}
        />
        <Text style={styles.activeText}>Faculty List</Text>
      </View>
      <View style={styles.buttonContainer}>
        <SecondaryButton
          selected={click}
          textStyle={{ fontSize: responsiveFontSize(2.3) }}
          onPress={() => {
            getFaculty();
            setClick(true);
            setClick1(false);
            setClick2(false);
          }}
        >
          All
        </SecondaryButton>
        <SecondaryButton
          selected={click1}
          textStyle={{ fontSize: responsiveFontSize(2.3) }}
          onPress={() => {
            getFacultyBranch();
            setClick1(true);
            setClick(false);
            setClick2(false);
          }}
        >
          Branch
        </SecondaryButton>
        <SecondaryButton
          selected={click2}
          textStyle={{ fontSize: responsiveFontSize(2.3) }}
          onPress={() => {
            Other();
            setClick2(true);
            setClick(false);
            setClick1(false);
          }}
        >
          Other
        </SecondaryButton>
      </View>
      {click2 ? (
        <View style={{ margin: 20 }}>
          <Text style={styles.other}>
            If your respective faculty name {"\n"} is not in the available list
            then {"\n"} you can directly contact us via email
          </Text>
          <PrimaryButton
            onPress={() => {
              Linking.openURL(
                "mailto: indusuniapp@gmail.com?subject=Faculty Not Found in the Provided List&body=" +
                  `${"\n"} Regards, ${"\n"} ${name} ${"\n"} ${enrollnmentNumber} ${"\n"} ${branch}, ${batchYear}`
              );
            }}
          >
            Connect via Email
          </PrimaryButton>
        </View>
      ) : (
        <View>
          <FlatList
            data={faculty}
            renderItem={({ item }) => card(item)}
            keyExtractor={(data) => data.fid}
            initialNumToRender={1}
            style={{ marginBottom: responsiveHeight(23) }}
          ></FlatList>
        </View>
      )}
    </View>
  );
};

export default FacultyList;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  containerImage: {
    alignItems: "center",
  },
  image2: {
    width: responsiveWidth(80),
    height: responsiveWidth(65),
  },
  card: {},
  topText: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileImg: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(30) / 2,
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    fontWeight: "800",
    fontSize: responsiveFontSize(2),
  },
  activeText: {
    fontSize: responsiveFontSize(3),
    color: Colors.grey,
    fontWeight: "500",
    paddingLeft: responsiveWidth(2),
  },
  titleView: {
    paddingTop: responsiveHeight(5.5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  answerTitle: {
    fontWeight: "500",

    color: Colors.grey,
    fontSize: responsiveFontSize(2.1),
    flexWrap: "wrap",
    width: responsiveWidth(50),
  },
  textContainer: {
    padding: 6,
    justifyContent: "flex-end",
  },

  moreText: {
    color: Colors.grey,
    textAlign: "center",
  },
  moreCon: {
    marginBottom: 10,
  },
  createButton: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
  other: {
    textAlign: "center",
    lineHeight: 25,
    fontSize: responsiveFontSize(2.3),
    marginVertical: 20,
    color: Colors.grey,
  },
});
