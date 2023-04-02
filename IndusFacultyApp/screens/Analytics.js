import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { BarChart, PieChart } from "react-native-chart-kit";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getCountFromServer,
} from "firebase/firestore";
import { app } from "../firebase";
import { useIsFocused } from "@react-navigation/native";
export default function Analytics({ navigation }) {
  const isFocused = useIsFocused();
  const auth = getAuth();
  const db = getFirestore(app);
  const useruid = auth.currentUser.uid;
  const [fid, setFid] = useState("");
  const [yes, setYes] = useState(0);
  const [no, setNo] = useState(0);
  const [dates, setDates] = useState([]);
  const [totalDoubtsCount, setTotalDoubtsCount] = useState(0);
  const [totalAnnouncements, setTotalAnnouncements] = useState(0);
  const getCurrentUser = async () => {
    const a = await getDoc(doc(db, "faculty", useruid));
    setFid(a.data().fid);
  };
  const getAllData = async () => {
    getCurrentUser();
    const doubts = collection(db, "resolveddoubts");
    const events = collection(db, "events");

    const doubtsCount = await getCountFromServer(
      query(doubts, where("fid", "==", fid))
    );
    const eventsCount = await getCountFromServer(
      query(events, where("fid", "==", fid))
    );
    setTotalDoubtsCount(doubtsCount.data().count);
    setTotalAnnouncements(eventsCount.data().count);

    const currentYear = new Date().getFullYear();

    const pastDoubts = collection(db, "pastdoubts");

    let first = toString(currentYear - 1);
    first = first.toString();
    let second = toString(currentYear - 2);
    second = second.toString();
    let third = toString(currentYear - 3);
    third = third.toString();
    let forth = currentYear - 4;
    forth = forth.toString();

    const year1Count = await getCountFromServer(
      query(
        pastDoubts,
        where("batchYear", "==", first),
        where("fid", "==", fid)
      )
    );
    const year2Count = await getCountFromServer(
      query(
        pastDoubts,
        where("batchYear", "==", second),
        where("fid", "==", fid)
      )
    );
    const year3Count = await getCountFromServer(
      query(
        pastDoubts,
        where("batchYear", "==", third),
        where("fid", "==", fid)
      )
    );
    const year4Count = await getCountFromServer(
      query(
        pastDoubts,
        where("batchYear", "==", forth),
        where("fid", "==", fid)
      )
    );
    let year1 = year1Count.data().count;
    let year2 = year2Count.data().count;
    let year3 = year3Count.data().count;
    let year4 = year4Count.data().count;
    let arr = [year1, year2, year3, year4];
    setDates(arr);

    const satisfiedYes = await getCountFromServer(
      query(pastDoubts, where("satisfy", "==", "yes"), where("fid", "==", fid))
    );
    setYes(satisfiedYes.data().count);
    const satisfiedNo = await getCountFromServer(
      query(pastDoubts, where("satisfy", "==", "no"), where("fid", "==", fid))
    );
    setNo(satisfiedNo.data().count);
  };
  useEffect(() => {
    if (isFocused) {
      getAllData();
    }
  }, [isFocused]);
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.boxContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate("Total Doubts");
          }}
        >
          <View style={styles.container}>
            <ImageBackground
              source={require("../assets/images/DoubtSolved.png")}
              style={styles.backdrop}
            >
              <View style={styles.overlay}>
                <Text style={styles.headline}>Total Doubts solved</Text>
                <Text style={styles.numbers}>{totalDoubtsCount}</Text>
              </View>
            </ImageBackground>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Total Announcements");
          }}
        >
          <View style={styles.container}>
            <ImageBackground
              source={require("../assets/images/Announcements.png")}
              style={styles.backdrop}
            >
              <View style={styles.overlay}>
                <Text style={styles.headline}>
                  Total number of Announcements
                </Text>
                <Text style={styles.numbers}>{totalAnnouncements}</Text>
              </View>
            </ImageBackground>
          </View>
        </Pressable>
      </View>

      <View style={styles.barChartContainer}>
        <Text style={styles.chartText}>Number of Doubts Raised</Text>
        <BarChart
          data={{
            labels: ["1st", "2nd", "3rd", "4rd"],
            datasets: [
              {
                data: dates,
              },
            ],
          }}
          width={responsiveWidth(93)}
          height={220}
          fromZero={true}
          showValuesOnTopOfBars={true}
          chartConfig={{
            backgroundGradientFrom: Colors.extralightgrey,
            backgroundGradientTo: Colors.extralightgrey,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(25, 49, 90, ${opacity})`,
            style: {
              paddingVertical: 8,
              marginHorizontal: 16,
            },
          }}
          style={styles.chart}
        />
      </View>
      <View style={styles.PieChartContainer}>
        <Text style={styles.chartText}>Satisfaction Rate</Text>
        <PieChart
          data={[
            {
              name: "Yes",
              doubts: yes,
              color: Colors.green,
              legendFontColor: Colors.blue,
              legendFontSize: responsiveFontSize(2),
            },
            {
              name: "No",
              doubts: no,
              color: Colors.red,
              legendFontColor: Colors.blue,
              legendFontSize: responsiveFontSize(2),
            },
          ]}
          width={responsiveWidth(93)}
          height={220}
          chartConfig={{
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(25, 49, 90, ${opacity})`,
          }}
          accessor="doubts"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  barChartContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(-4.5),
  },
  chartText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "600",
    marginVertical: 8,
  },
  PieChartContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  chart: {
    marginHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
  },

  boxContainer: {
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: responsiveHeight(5),
    borderRadius: 10,
  },
  container: {
    alignItems: "center",
    marginVertical: responsiveHeight(2),
    borderRadius: 6,
    overflow: "hidden",
  },
  backdrop: {
    width: responsiveWidth(45),
    height: responsiveWidth(25),
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    fontWeight: "600",
    paddingHorizontal: 8,
  },
  numbers: {
    fontSize: responsiveFontSize(3),
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
});
