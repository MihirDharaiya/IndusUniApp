import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { ScrollView, StyleSheet, Text, View, Linking } from "react-native";
import Colors from "../constants/Colors";
import BorderCard from "../components/BorderCard";
import React from "react";
const ViewDetails = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.rootContainer}>
      <View>
        <Text style={styles.mainTitle}>Details of the Event</Text>
      </View>
      <View style={styles.line}></View>
      <View>
        <Text style={styles.titleText}>{route.params.data.title}</Text>
      </View>

      <View style={styles.headingView}>
        <Text style={styles.headingText}>Event Date:</Text>
        <Text style={styles.answerText2}>{route.params.data.eventDate}</Text>
      </View>
      {route.params.data.registerDate ? (
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Registration Date:</Text>
          <Text style={styles.answerText2}>
            {route.params.data.registerDate}
          </Text>
        </View>
      ) : null}

      <View style={styles.DescContainer}>
        <Text style={styles.fieldName}>Description:</Text>
        <Text style={styles.descText}>{route.params.data.description}</Text>
      </View>
      {!route.params.data.link ? null : (
        <View style={styles.LinkContainer}>
          <Text style={styles.fieldName}>Link:</Text>
          <Text
            style={{
              color: Colors.darkred,
              marginTop: responsiveHeight(0.2),
            }}
            onPress={() => {
              Linking.openURL(route.params.data.link);
            }}
          >
            {route.params.data.link}
          </Text>
        </View>
      )}
      <View style={styles.fnameContainer}>
        <Text style={styles.field}>By- </Text>
        <Text style={styles.fieldData}>{route.params.data.fname}</Text>
      </View>
    </ScrollView>
  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // backgroundColor: Colors.offwhite,
    paddingTop: responsiveHeight(5),
    paddingBottom: 40,
    paddingHorizontal: responsiveWidth(4),
  },
  mainTitle: {
    color: Colors.red,
    fontSize: responsiveFontSize(2.5),
    fontWeight: "500",
    textAlign: "center",
  },
  line: {
    marginVertical: responsiveHeight(1),
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  titleText: {
    color: Colors.green,
    fontSize: responsiveFontSize(2),
    fontWeight: "500",
    margin: 5,
    marginBottom: responsiveHeight(2),
    textAlign: "center",
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
    paddingBottom: responsiveHeight(2.3),
  },
  headingView: {
    flexDirection: "row",
    paddingBottom: responsiveHeight(0.5),
    paddingLeft: responsiveWidth(0.6),
    paddingRight: responsiveWidth(0.3),
  },
  headingText: {
    fontWeight: "700",
    fontSize: responsiveFontSize(2.3),
  },
  answerText2: {
    fontWeight: "700",
    fontSize: responsiveFontSize(2.3),
    color: Colors.grey,
    marginLeft: 4,
  },
  fieldName: {
    color: Colors.blue,
    fontSize: responsiveFontSize(2.3),
    fontWeight: "700",
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
  },
  descText: {
    fontSize: responsiveFontSize(2),
    lineHeight: 22,
  },
  LinkContainer: {
    marginTop: 10,
  },
  fnameContainer: {
    marginBottom: responsiveHeight(10),
    flexDirection: "row",
    justifyContent: "center",
  },
  field: {
    color: Colors.navyblue,
    fontSize: responsiveFontSize(2.5),
  },
  fieldData: {
    color: Colors.purple,
    fontSize: responsiveFontSize(2.5),
    fontWeight: "800",
  },
});
