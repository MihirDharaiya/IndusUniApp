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
import Colors from "../constants/Colors";
import BorderCard from "../components/BorderCard";
import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import {
  query,
  getDocs,
  getFirestore,
  where,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
export default function Notification({ route, navigation }) {
  const isFocused = useIsFocused();
  const db = getFirestore(app);
  const [noData, setNoData] = useState(false);
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const doubts = collection(db, "events");
    const q = query(
      doubts,
      orderBy("category", "desc"),
      where("category", "!=", "1"),
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
        arr[i]["eventId"] = arrId[i];
      }
      if (arr.length !== 0) {
        setEvents(arr);
      } else {
        setNoData(true);
      }
    });
  };
  useEffect(() => {
    if (isFocused) {
      getEvents();
      setNoData(false);
    }
  }, [isFocused]);
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
              <Text style={styles.headingText}>Faculty Name:</Text>
              <Text style={styles.headingText}>Event Date:</Text>
            </View>
            <View style={styles.answerView}>
              <Text style={styles.answerText}>{data.fname}</Text>
              <Text style={styles.answerText2}>{data.eventDate}</Text>
            </View>
            <View>
              <Text numberOfLines={3} style={styles.titleText}>
                {data.title}
              </Text>
            </View>
            <View style={styles.mainContainer}>
              <Text numberOfLines={3}>{data.description}</Text>
            </View>
          </BorderCard>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoText}>
          Tab the card to view the event details
        </Text>
      </View>
      {noData ? (
        <View style={styles.noActivityContainer}>
          <Text style={styles.noActivityText}>No activity at the moment</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={events}
            renderItem={({ item }) => card(item)}
            keyExtractor={(data) => data.eventId}
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
    paddingTop: 16,
    marginBottom: responsiveHeight(5),
  },
  infoTextContainer: {
    justifyContent: "center",
    paddingBottom: 8,
  },
  infoText: {
    textAlign: "center",
    color: Colors.darkred,
    fontSize: responsiveFontSize(2),
    fontWeight: "400",
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
  activeText: {
    fontSize: responsiveFontSize(3),
    color: Colors.grey,
    fontWeight: "500",
    paddingLeft: responsiveWidth(2),
  },
  titleView: {
    paddingTop: responsiveHeight(1.8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: responsiveHeight(2),
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
    color: Colors.darkred,
  },
  answerText2: {
    fontWeight: "700",
    fontSize: responsiveFontSize(2),
    color: Colors.grey,
  },
  titleText: {
    color: Colors.blue,
    fontSize: responsiveFontSize(2),
    fontWeight: "700",
    margin: 5,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: responsiveHeight(2),
  },
});
