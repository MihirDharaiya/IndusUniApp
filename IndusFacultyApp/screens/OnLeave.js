import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Button,
  Platform,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";
import { useState } from "react";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function OnLeave() {
  const [fromMode, setFromMode] = useState("date");
  const [fromShow, setFromShow] = useState(false);
  const [toMode, setToMode] = useState("date");
  const [toShow, setToShow] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [toText, setToText] = useState("Select Date");
  const [fromText, setFromText] = useState("Select Date");
  function confirmLeave() {
    if (toText < fromText) {
      alert("Kindly Enter Valid dates.");
    } else {
    }
  }
  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setFromShow(Platform.OS === "ios");
    setFromDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setFromText(fDate);
  };
  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setToShow(Platform.OS === "ios");
    setToDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setToText(fDate);
  };
  const fromShowMode = (currentMode) => {
    setFromShow(true);
    setFromMode(currentMode);
  };
  const toShowMode = (currentMode) => {
    setToShow(true);
    setToMode(currentMode);
  };
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.onLeaveImageContainer}>
        <Image
          style={styles.onLeaveImage}
          source={require("../assets/images/OnLeave.png")}
        />
      </View>
      <Card cardStyle={styles.card}>
        <View style={styles.mainDatecontainer}>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>On Leave From: </Text>
              <Text style={styles.dateText}>{fromText}</Text>
            </View>
            <PrimaryButton
              iconVisible={true}
              style={styles.iconRight}
              iconName="calendar-alt"
              size={responsiveFontSize(2.3)}
              color={Colors.white}
              onPress={() => fromShowMode("date")}
            >
              From Date
            </PrimaryButton>
            {fromShow && (
              <DateTimePicker
                style={styles.datePickerStyle}
                testID="Set Date"
                value={fromDate}
                mode={fromMode}
                display="default"
                minDate={new Date()}
                onChange={onFromDateChange}
              />
            )}
          </View>

          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>On Leave To: </Text>
              <Text style={styles.dateText}>{toText}</Text>
            </View>
            <SecondaryButton
              iconVisible={true}
              iconName="calendar"
              size={responsiveFontSize(3)}
              color={Colors.blue}
              textStyle={{ color: Colors.blue }}
              onPress={() => toShowMode("date")}
            >
              To Date
            </SecondaryButton>
            {toShow && (
              <DateTimePicker
                testID="Set Date"
                value={toDate}
                mode={toMode}
                display="default"
                minDate={new Date()}
                onChange={onToDateChange}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              iconVisible={false}
              viewStyle={styles.button}
              iconName="calendar-alt"
              size={responsiveFontSize(2.3)}
              color={Colors.white}
              onPress={confirmLeave}
            >
              Confirm Leave
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  onLeaveImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  onLeaveImage: {
    justifyContent: "center",
    width: responsiveHeight(40),
    height: responsiveHeight(40),
  },
  mainDatecontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    width: responsiveWidth(90),
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  text: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "300",
  },
  dateText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "600",
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    width: responsiveWidth(80),
    marginTop: 20,
  },
});
