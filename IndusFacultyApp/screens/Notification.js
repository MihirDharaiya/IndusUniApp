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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../constants/Colors";
import BorderCard from "../components/BorderCard";
import React, { useState, useEffect, useCallback } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import {
  query,
  getDocs,
  getFirestore,
  where,
  collection,
} from "firebase/firestore";
export default function Notification() {
  const auth = getAuth();
  const db = getFirestore(app);
  const [noData, setNoData] = useState(true);
  const [events, setEvents] = useState([]);

  async function getEvents() {
    const doubts = collection(db, "events");
    const q = query(doubts, where("category", "!=", "1"));
    const docSnap = await getDocs(q);
    if (!docSnap.empty) {
      var arr = [];
      var arrId = [];
      docSnap.forEach((doc) => {
        arr.push(doc.data());
        arrId.push(doc.id);
      });
      for (let i = 0; i < arr.length; i++) {
        arr[i]["eventId"] = arrId[i];
      }
      setEvents(arr);
    } else {
      setNoData(true);
    }
  }
  useEffect(() => {
    getEvents();
    setNoData(false);
  }, []);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };
  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);
  function card(data) {
    return (
      <View>
        <BorderCard>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Faculty Name:</Text>
            <Text style={styles.headingText}>Event Date:</Text>
          </View>
          <View style={styles.answerView}>
            <Text style={styles.answerText}>{data.fname}</Text>
            <Text style={styles.answerText2}>{data.date}</Text>
          </View>
          <View>
            <Text style={styles.titleText}>{data.title}</Text>
          </View>
          <View style={styles.mainContainer}>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              style={{ lineHeight: 21 }}
            >
              {data.description}
            </Text>
            {lengthMore ? (
              <>
                <Text
                  onPress={toggleNumberOfLines}
                  style={{
                    lineHeight: 21,
                    marginTop: 10,
                    color: Colors.navyblue,
                  }}
                >
                  {textShown ? "Read less..." : "Read more..."}
                </Text>

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
              </>
            ) : null}
          </View>
        </BorderCard>
      </View>
    );
  }
  return (
    <View style={styles.rootContainer}>
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
