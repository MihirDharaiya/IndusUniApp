import { StyleSheet,View, Button, Text} from 'react-native'
import {React,useState} from 'react'
import FlexedButtons from '../components/FlexedButtons'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryTextInputField from '../components/SecondaryTextInputField'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from '../constants/Colors'

export default function Community() {
  const [showSection1, setShowSection1] = useState(true);

  const toggleSections = () => {
    setShowSection1(!showSection1);
  };
  return (
    <View style={styles.rootContainer}>
      <View>
      <FlexedButtons></FlexedButtons>
      <View style={styles.container}>
        <View style={styles.searchBox}>
        <SecondaryTextInputField
        iconVisible={true}
        iconName={"search"}
        size={responsiveFontSize(3)}
        placeholder={"Search By Name"}
        ></SecondaryTextInputField>
        </View>
        <View style={styles.button}>
        <PrimaryButton>Search</PrimaryButton>
        </View>
      </View>
      </View>
     </View>
  );
};

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: Colors.white
    },
    container:{
      flexDirection: 'row',
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchBox:{
      width: responsiveWidth(55),
      marginTop: responsiveHeight(1.1)
    },
    button: {
      width: responsiveWidth(40)
    }
});