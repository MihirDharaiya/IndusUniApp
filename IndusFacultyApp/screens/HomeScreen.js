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
  Image,
  Pressable,
} from "react-native";
import Colors from "../constants/Colors";
import React from "react";
import Card from "../components/Card";
import GreyCard from "../components/GreyCard";
import Icon from "react-native-vector-icons/FontAwesome5";
import AnswerDoubt from "./AnswerDoubt";
export default function HomeScreen({
  studentName,
  studentEnrollNo,
  studentBranch,
  navigation,
}) {
  return (
    <ScrollView style={styles.rootContainer}>
      <Card>
        <View style={styles.dateContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.hintText, { fontWeight: "600" }]}>
              Raised on:
            </Text>
            <Text style={[styles.text, { fontWeight: "600" }]}>12/09/2023</Text>
          </View>
          <View style={styles.reportContainer}>
            <Icon name="flag" size={responsiveFontSize(2)} color={Colors.red} />
            <Text
              style={[
                styles.text,
                {
                  fontWeight: "400",
                  color: Colors.red,
                  fontSize: responsiveFontSize(1.6),
                },
              ]}
            >
              Report
            </Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.profileImg}
              source={require("../assets/images/Profile.png")}
            />
          </View>
          <View style={styles.studentsContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.hintText}>Title:</Text>
              <Text style={styles.text}>Jalay Shah</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.hintText}>Enroll No.:</Text>
              <Text style={styles.text}>IU194123001</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.hintText}>Branch:</Text>
              <Text style={styles.text}>CSE, 4th year</Text>
            </View>
          </View>
        </View>

        <View style={styles.subjectContainer}>
          <Text style={styles.hintsubjectText}>Subject:</Text>
          <Text style={styles.subjectText}>
            Regarding Letter Of Recommendation
          </Text>
        </View>
        {/* <TextInputBoxField
          title={"Description:"}
          lines={4}
          placeholder="Enter Text"
        /> */}
        <View style={styles.descContainer}>
          <Text style={styles.descHintText}>Description:</Text>
          <View style={styles.textScroll}>
            <Text style={styles.descText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>
        </View>

        <View style={styles.optionsOuterContainer}>
          <Pressable>
            <View style={styles.reportInnerContainer}>
              <Icon
                name="times-circle"
                size={responsiveFontSize(3)}
                color={Colors.red}
              />
              <Text
                style={[
                  styles.text,
                  {
                    fontWeight: "600",
                    color: Colors.red,
                    fontSize: responsiveFontSize(2.3),
                  },
                ]}
              >
                Reject
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("AnswerDoubt");
            }}
          >
            <View style={styles.reportInnerContainer}>
              <Icon
                name="check-circle"
                size={responsiveFontSize(3)}
                color={Colors.green}
              />
              <Text
                style={[
                  styles.text,
                  {
                    fontWeight: "600",
                    color: Colors.green,
                    fontSize: responsiveFontSize(2.3),
                  },
                ]}
              >
                Accept
              </Text>
            </View>
          </Pressable>
        </View>
      </Card>

      <View style={styles.pastEventContainer}>
        <View style={styles.pastEventTextContainer}>
          <Text style={styles.pastEventText}>Past Doubts:</Text>
        </View>
        <GreyCard
          isDetails={true}
          nameText="jainish"
          enrollNoText="IU1941230105"
          titleText="Want to discuss regarding Project"
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
  dateContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  reportContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgContainer: {
    margin: 16,
  },
  profileImg: {
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: 25,
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: responsiveHeight(1.5),
  },
  hintText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "300",
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "400",
    color: Colors.lightgrey,
    marginLeft: 4,
  },
  subjectContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hintsubjectText: {
    marginRight: 8,
    fontSize: responsiveFontSize(2),
    fontWeight: "400",
  },
  subjectText: {
    flexShrink: 1,
    fontSize: responsiveFontSize(2),
    fontWeight: "400",
    color: Colors.blue,
  },
  descContainer: {
    marginBottom: 1,
  },
  descHintText: {
    fontSize: responsiveFontSize(2),
    fontWeight: "500",
    marginVertical: 4,
  },
  textScroll: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10,
    padding: responsiveWidth(2),
  },
  descText: {
    fontSize: responsiveFontSize(2),
    textAlign: "left",
  },
  optionsOuterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  reportInnerContainer: {
    flexDirection: "row",
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
});
