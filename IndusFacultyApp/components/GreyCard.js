import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors.js";
export default function GreyCard({
  isDetails,
  titleText,
  nameText,
  enrollNoText,
  eventDateData,
  onPress,
}) {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + "/" + month + "/" + year;
  };

  return (
    <View style={styles.cardContainer}>
      {isDetails ? (
        // details
        <View style={styles.detailsImgContainer}>
          <View style={styles.profileImgContainer}>
            <Image
              style={styles.profileImg}
              source={require("../assets/images/Profile.png")}
            />
          </View>
          <View style={styles.detailsOuterContainer}>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsHintText}>Name: </Text>
              <Text style={styles.detailsTextData}>{nameText}</Text>
            </View>
            <View style={styles.detailsInnerContainer}>
              <Text style={styles.detailsHintText}>Enroll No.: </Text>
              <Text style={styles.detailsTextData}>{enrollNoText}</Text>
            </View>
          </View>
        </View>
      ) : (
        // Date
        <View style={styles.eventContainer}>
          <Text style={styles.dateHintText}>Scheduled On: </Text>
          <Text style={styles.dateHintTextData}>{getCurrentDate()}</Text>
        </View>
      )}
      <View style={styles.titleContainer}>
        <Text
          style={isDetails ? styles.titleHintTextDetails : styles.titleHintText}
        >
          Title:
        </Text>
        <Text
          style={isDetails ? styles.titleTextDataDetails : styles.titleTextData}
        >
          {titleText}
        </Text>
      </View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
      >
        <View style={styles.viewMoreContainer}>
          <Text style={styles.viewMore}>view more</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: responsiveHeight(1),
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.offwhite,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  detailsImgContainer: {
    flexDirection: "row",
  },
  detailsOuterContainer: {
    marginLeft: responsiveWidth(3),
  },
  detailsInnerContainer: {
    flexDirection: "row",
    marginVertical: responsiveHeight(1),
  },
  detailsHintText: {
    fontSize: responsiveFontSize(1.8),
    color: Colors.grey,
    fontWeight: "bold",
  },
  detailsTextData: {
    fontSize: responsiveFontSize(1.8),
    color: Colors.blue,
    fontWeight: "bold",
  },
  profileImg: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: 50,
  },
  eventContainer: {
    flexDirection: "row",
    marginVertical: responsiveHeight(1),
  },
  dateHintText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "500",
  },
  dateHintTextData: {
    fontSize: responsiveFontSize(1.8),
    color: Colors.green,
    fontWeight: "500",
  },
  titleContainer: {
    flexDirection: "row",
    marginVertical: responsiveHeight(1),
  },
  titleHintText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
  },
  titleTextData: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "bold",
    color: Colors.navyblue,
  },
  titleHintTextDetails: {
    fontSize: responsiveFontSize(2),
    fontWeight: "400",
    marginRight: 8,
  },
  titleTextDataDetails: {
    fontSize: responsiveFontSize(2),
    color: Colors.navyblue,
    fontWeight: "400",
    flexShrink: 1,
  },
  viewMore: {
    fontSize: responsiveFontSize(1.9),
    textAlign: "right",
    color: Colors.darkred,
    fontWeight: "bold",
    marginTop: -10,
  },
  pressed: {
    opacity: 0.5,
  },
});
