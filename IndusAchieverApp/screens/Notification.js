import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../constants/Colors";
import BorderCard from "../components/BorderCard";
import TextInputBoxField from "../components/TextInputBoxField";

export default function Notification() {
  return (
    <ScrollView style={styles.rootContainer}>
      <View>
      <View style={styles.titleView}>
            <Icon name="bell" color={Colors.grey} size={responsiveFontSize(3)}/>
            <Text style={styles.activeText}>Announcement</Text>
          </View>
      <BorderCard>
      <View style={styles.headingView}>
            <Text style={styles.headingText}>Faculty Name:</Text>
            <Text style={styles.headingText}>Raised On:</Text>
          </View>
          <View style={styles.answerView}>
            <Text style={styles.answerText}>Rahul Bhatt</Text>
            <Text style={styles.answerText}>16/11/2022</Text>
          </View>
          <TextInputBoxField lines={15}>
            <Text>There is a workshop regarding C language, Those who are interested fill the form below.</Text>
          </TextInputBoxField>
      </BorderCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  activeText: {
    fontSize: responsiveFontSize(3),
    color:Colors.grey,
    fontWeight: '500',
    paddingLeft: responsiveWidth(2),
  },
  titleView:{
    paddingTop: responsiveHeight(1.8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: responsiveHeight(2)
  },
  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: responsiveHeight(0.5),
    paddingLeft: responsiveWidth(0.6),
    paddingRight: responsiveWidth(0.3)
  },
  headingText: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2)
  },
  answerView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: responsiveWidth(0.6),
    paddingRight: responsiveWidth(0.3),
    paddingBottom: responsiveHeight(1)
  },
  answerText: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
    color:Colors.grey
  },
});
