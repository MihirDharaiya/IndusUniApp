import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import TextInputBoxField from "../components/TextInputBoxField";
import PrimaryButton from "../components/PrimaryButton";
import GreyCard from "../components/GreyCard";
import Colors from "../constants/Colors";
export default function Announcement() {
  const [selected, setSelected] = React.useState("");
  const data = [
    { key: "1", value: "Students", selected },
    { key: "2", value: "Faculties" },
    { key: "3", value: "Both" },
  ];
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <TextInputBoxField
          title={"Event Date:"}
          lines={1}
          placeholder="12/08/2001"
        />
        <TextInputBoxField
          title={"Title"}
          lines={1}
          placeholder="Enter Title"
        />
        <TextInputBoxField
          title={"Description:"}
          lines={1}
          placeholder="Enter Text"
        />
        <TextInputBoxField title={"Link:"} lines={1} placeholder="Enter Link" />
      </View>
      <View style={styles.listContainer}>
        <SelectList
          dropdownShown={false}
          boxStyles={styles.listBox}
          inputStyles={styles.list}
          setSelected={setSelected}
          data={data}
          search={false}
          placeholder="Category"
          dropdownStyles={{
            backgroundColor: Colors.extralightgrey,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton> Post </PrimaryButton>
      </View>

      <View style={styles.pastEventContainer}>
        <View style={styles.pastEventTextContainer}>
          <Text style={styles.pastEventText}>Past Made Events :</Text>
        </View>
        <GreyCard
          titleText="Webinar on C++"
          eventDateData="12/08/23"
        ></GreyCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
  },
});
