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
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import TextInputBoxField from "../components/TextInputBoxField";
import PrimaryButton from "../components/PrimaryButton";
import GreyCard from "../components/GreyCard";
import Colors from "../constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { app } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Announcement() {
  const data = [
    { key: "1", value: "Students", selected },
    { key: "2", value: "Faculties" },
    { key: "3", value: "Both" },
  ];

  const auth = getAuth();
  const db = getFirestore(app);
  // date
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState("No Date");
  const [todayDateText, settodayDateText] = useState("No Date");

  const [lastDateMode, setLastDateMode] = useState("date");
  const [lastDateShow, setLastDateShow] = useState(false);
  const [lastDate, setLastDate] = useState(new Date());
  const [lastDateText, setlastDateText] = useState("No Date");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [selected, setSelected] = useState("1");
  const [error, setError] = useState("");

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let todayDate = new Date();
    let tDate =
      todayDate.getDate() +
      "/" +
      (todayDate.getMonth() + 1) +
      "/" +
      todayDate.getFullYear();
    settodayDateText(tDate);
    setDateText(fDate);
  };
  const lasDateShowMode = (currentMode) => {
    setLastDateShow(true);
    setLastDateMode(currentMode);
  };
  const lastDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || lastDate;
    setLastDateShow(Platform.OS === "ios");
    setLastDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setlastDateText(fDate);
  };
  const addEvent = async () => {
    if (dateText < todayDateText) {
      setError("Previous date is not allowed");
    } else if (lastDateText < dateText) {
      setError("Registration Date can't be a Previous date.");
    } else if (dateText === "No Date") {
      setError("Please Enter Valid Date!!");
    } else if (title.length < 15) {
      setError("Title is too short");
      if (!title) {
        setError("Please Enter revalent Title !!");
      }
    } else if (desc.length < 50) {
      setError("Description is too short");
      if (!desc) {
        setError("Please Enter detailed Description !!");
      }
    } else {
      setError("");
      let nolastdate = false;
      if (lastDateText === "No Date") {
        nolastdate = true;
      }
      let user = await AsyncStorage.getItem("users");
      user = JSON.parse(user);
      await addDoc(collection(db, "events"), {
        branch: user.fbranch,
        date: dateText,
        title: title,
        description: desc,
        link: link,
        category: selected,
        registerDate: nolastdate ? "" : lastDateText,
      }).then(() => {
        setDate(new Date());
        setDateText("No Date");
        setLastDate(new Date());
        setlastDateText("No Date");
        setLink("");
        setTitle("");
        setDesc("");
        setSelected("1");
        if (Platform.OS === "android") {
          ToastAndroid.show("Event is Notified", ToastAndroid.SHORT);
        } else {
          AlertIOS.alert("Notified", "Event is Notified");
        }
      });
    }
  };
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Event Date: </Text>
            <Text style={styles.dateText}>{dateText}</Text>
          </View>
          <PrimaryButton
            textNotVisible={true}
            iconVisible={true}
            style={styles.iconRight}
            iconName="calendar-alt"
            size={responsiveFontSize(2.3)}
            color={Colors.white}
            onPress={() => showMode("date")}
          >
            Select Date
          </PrimaryButton>
          {show && (
            <DateTimePicker
              style={styles.datePickerStyle}
              testID="Set Date"
              value={date}
              mode={mode}
              display="default"
              minDate={new Date()}
              onChange={onDateChange}
            />
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Register Upto: </Text>
            <Text style={styles.dateText}>{lastDateText}</Text>
          </View>
          <PrimaryButton
            textNotVisible={true}
            iconVisible={true}
            style={styles.iconRight}
            iconName="calendar"
            size={responsiveFontSize(2.3)}
            color={Colors.white}
            onPress={() => lasDateShowMode("date")}
          >
            Select Date
          </PrimaryButton>
          {lastDateShow && (
            <DateTimePicker
              style={styles.datePickerStyle}
              testID="Set Date"
              value={lastDate}
              mode={lastDateMode}
              display="default"
              minDate={new Date()}
              onChange={lastDateChange}
            />
          )}
        </View>

        <TextInputBoxField
          title={"Title"}
          lines={1}
          placeholder="Enter Title"
          enteredValue={title}
          enteredValueHandler={(text) => setTitle(text)}
        />
        <TextInputBoxField
          title={"Description:"}
          lines={3}
          placeholder="Enter Text"
          enteredValue={desc}
          enteredValueHandler={(text) => setDesc(text)}
        />
        <TextInputBoxField
          title={"Link:"}
          lines={1}
          placeholder="Enter Link"
          enteredValue={link}
          enteredValueHandler={(text) => setLink(text)}
        />
      </View>
      <View style={styles.listContainer}>
        <SelectList
          dropdownShown={false}
          boxStyles={styles.listBox}
          inputStyles={styles.list}
          setSelected={(val) => setSelected(val)}
          value={selected}
          data={data}
          search={false}
          placeholder="Students"
          set
          dropdownStyles={{
            backgroundColor: Colors.extralightgrey,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={addEvent}> Post </PrimaryButton>
      </View>
      {error == "" ? null : (
        <View style={{ paddingTop: 10 }}>
          <Text style={{ color: Colors.red, textAlign: "center" }}>
            {error}
          </Text>
        </View>
      )}
      <View style={styles.pastEventContainer}>
        <View style={styles.pastEventTextContainer}>
          <Text style={styles.pastEventText}>Past Made Events :</Text>
        </View>
        <GreyCard
          isDetails={true}
          nameText="jainish"
          enrollNoText="IU1941230105"
          titleText="Webinar on C++"
          eventDateData="12/08/23"
        ></GreyCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    padding: 16,
  },
  listContainer: {
    flexDirection: "row",
    paddingBottom: 8,
    justifyContent: "center",
    flex: 1,
  },
  listBox: {
    width: responsiveWidth(40),
    position: "relative",
  },
  list: {
    fontSize: responsiveFontSize(2.3),
    paddingRight: 20,
  },
  buttonContainer: {
    marginTop: -5,
    alignItems: "center",
  },
  pastEventContainer: {
    padding: 8,
  },
  pastEventTextContainer: {
    marginVertical: 4,
  },
  pastEventText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    width: responsiveWidth(90),
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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
    fontWeight: "bold",
  },
  dateText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "300",
  },
});
