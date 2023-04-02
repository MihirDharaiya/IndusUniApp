import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  BackHandler,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import ImageTextStack from "../components/ImageTextStack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PrimaryButton from "../components/PrimaryButton";
import { Linking } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getCountFromServer,
} from "firebase/firestore";
import { app } from "../firebase/firebase";

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [totalDoubtsCount, setTotalDoubtsCount] = useState(0);
  const auth = getAuth();
  const useruid = auth.currentUser.uid;
  const db = getFirestore(app);
  async function count() {
    const a = await getDoc(doc(db, "users", useruid));
    const doubts = collection(db, "activedoubts");
    const doubtsCount = await getCountFromServer(
      query(
        doubts,
        where("enrollnmentNumber", "==", a.data().enrollnmentNumber)
      )
    );
    setTotalDoubtsCount(doubtsCount.data().count);
  }
  useEffect(() => {
    count();
    // const backAction = () => {
    //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    //     {
    //       text: 'Cancel',
    //       onPress: () => null,
    //       style: 'cancel',
    //     },
    //     {text: 'YES', onPress: () => BackHandler.exitApp()},
    //   ]);
    //   return true;
    // };
    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );
  
    // return () => backHandler.remove();
    
  }, [isFocused]);
  return (
    <KeyboardAwareScrollView style={styles.conatiner}>
      <Text style={styles.topText}>
        Here you can create your{"\n"} respective doubts {"\n"} according to the
        your branch faculties
      </Text>
      <View style={styles.containerImage}>
        <Image
          style={styles.image2}
          source={require("../assets/images/Create.gif")}
        />
      </View>
      <View style={styles.createButton}>
        <PrimaryButton
          onPress={() => {
            navigation.navigate("FacultyList");
          }}
          iconVisible={true}
          style={styles.iconRight}
          iconName="undo"
          size={responsiveFontSize(2.3)}
          color={Colors.white}
        >
          Create a Doubt
        </PrimaryButton>
      </View>
      <View style={styles.card}></View>
      <ImageTextStack
        onPressActive={() => {
          navigation.navigate("ActiveDoubts");
        }}
        onPressQuestions={() => {
          navigation.navigate("FrequentlyAskedQuestion");
        }}
        count={totalDoubtsCount}
      ></ImageTextStack>
      <View style={styles.calendarView}>
        <Pressable
          onPress={() => {
            Linking.openURL(
              "https://indusuni.ac.in/academics/academic-calender.php"
            );
          }}
        >
          <ImageBackground
            source={require("../assets/images/Calendar.png")}
            style={styles.CalendarContainer}
          >
            <View style={styles.textContainer}>
              <Text style={styles.calendarText}>
                Academic Calendar {"\n"} for {"\n"} 2022-2023
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.white,
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
    margin: 10,
  },
  profileImg: {
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: 25,
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    fontWeight: "800",
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
  },
  answerTitle: {
    fontWeight: "500",
    marginBottom: responsiveHeight(1),
    color: Colors.grey,
    fontSize: responsiveFontSize(1.8),
    flexWrap: "wrap",
    width: responsiveWidth(50),
  },
  textContainer: {
    padding: 6,
    justifyContent: "flex-end",
  },
  CalendarContainer: {
    marginBottom: responsiveHeight(4),
    width: responsiveWidth(92),
    height: responsiveHeight(15),
  },
  calendarText: {
    color: Colors.black,
    fontSize: responsiveFontSize(2.3),
    fontWeight: "600",
    textAlign: "right",
    paddingTop: responsiveHeight(1.1),
    paddingRight: responsiveWidth(2),
  },
  calendarView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
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
});
