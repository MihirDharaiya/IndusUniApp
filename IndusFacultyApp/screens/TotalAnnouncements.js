import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../constants/Colors";
import BorderCard from "../components/BorderCard";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import {
  query,
  getDoc,
  doc,
  getDocs,
  getFirestore,
  where,
  collection,
} from "firebase/firestore";
export default function TotalAnnouncements() {
  const auth = getAuth();
  const db = getFirestore(app);
  const useruid = auth.currentUser.uid;
  const [noData, setNoData] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [fid, setFid] = useState("");
  const getCurrentUser = async () => {
    const a = await getDoc(doc(db, "faculty", useruid));
    setFid(a.data().fid);
  };
  const getAnnouncements = async () => {
    getCurrentUser();
    const doubts = collection(db, "events");
    const q = query(doubts, where("fid", "==", fid));
    const docSnap = await getDocs(q);
    if (!docSnap.empty) {
      var arr = [];
      var arrId = [];
      docSnap.forEach((doc) => {
        arr.push(doc.data());
        arrId.push(doc.id);
      });
      for (let i = 0; i < arr.length; i++) {
        arr[i]["announcementId"] = arrId[i];
      }
      setAnnouncements(arr);
    } else {
      setNoData(true);
    }
  };
  useEffect(() => {
    getAnnouncements();
    setNoData(false);
  });
  function card(data) {
    return (
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("Event Details", { data: data });
          }}
        >
          <BorderCard>
            <View style={styles.headingView}>
              <Text style={styles.headingText}>Event Date:</Text>
              <Text style={styles.answerText}>{data.date}</Text>
            </View>
            <View style={styles.headingView}>
              <Text style={styles.headingText}>Registration Date:</Text>
              <Text style={styles.answerText}>{data.registerDate}</Text>
            </View>

            <View>
              <Text style={styles.titleText}>{data.title}</Text>
            </View>
            <View style={styles.mainContainer}>
              <Text style={styles.fieldName}>Description:</Text>
              <Text>{data.description}</Text>
            </View>
            {!data.link ? null : (
              <View style={styles.LinkContainer}>
                <Text style={styles.fieldName}>Link:</Text>
                <Text
                  style={{
                    color: Colors.darkred,
                    marginTop: responsiveHeight(0.2),
                  }}
                  onPress={() => {
                    Linking.openURL(data.link);
                  }}
                >
                  {data.link}
                </Text>
              </View>
            )}
          </BorderCard>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.rootContainer}>
      {noData ? (
        <View style={styles.noActivityContainer}>
          <Text style={styles.noActivityText}>
            No Announcements at the moment
          </Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={announcements}
            renderItem={({ item }) => card(item)}
            keyExtractor={(data) => data.announcementId}
          ></FlatList>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  noActivityContainer: {
    justifyContent: "center",
    height: responsiveHeight(80),
  },
  noActivityText: {
    textAlign: "center",
    fontSize: responsiveFontSize(2.3),
    fontWeight: "300",
    color: Colors.grey,
  },
  titleText: {
    color: Colors.green,
    fontSize: responsiveFontSize(2),
    fontWeight: "500",
    marginTop: responsiveHeight(1),
    marginBottom: 5,
    textAlign: "center",
  },
  titleView: {
    paddingTop: responsiveHeight(1.8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: responsiveHeight(2.3),
  },
  headingView: {
    flexDirection: "row",
    paddingBottom: responsiveHeight(0.5),
    paddingLeft: responsiveWidth(0.6),
    paddingRight: responsiveWidth(0.3),
  },
  headingText: {
    fontWeight: "400",
    fontSize: responsiveFontSize(2),
  },
  answerText: {
    fontWeight: "400",
    fontSize: responsiveFontSize(2),
    color: Colors.grey,
    marginLeft: 6,
  },
  fieldName: {
    color: Colors.blue,
    fontSize: responsiveFontSize(2),
    fontWeight: "700",

    marginBottom: responsiveHeight(1),
  },
  replyField: {
    color: Colors.red,
    fontSize: responsiveFontSize(2),
    fontWeight: "700",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
  },
  mainContainer: {
    marginBottom: 10,
  },
});
