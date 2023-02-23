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
import React from "react";
import Colors from "../constants/Colors";
export default function Analytics({ navigation }) {
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
                <Text style={styles.numbers}>80</Text>
              </View>
            </ImageBackground>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Announctments");
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
                <Text style={styles.numbers}>10</Text>
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
                data: [20, 45, 28, 60],
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
              doubts: 100,
              color: Colors.green,
              legendFontColor: Colors.blue,
              legendFontSize: responsiveFontSize(2),
            },
            {
              name: "No",
              doubts: 10,
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
