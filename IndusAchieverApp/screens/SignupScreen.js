import { StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
import PrimaryButton from '../components/PrimaryButton';
import  Colors  from '../constants/Colors';
import Card from '../components/Card';
import TextInputField from '../components/TextInputField'
import SecondaryButton from '../components/SecondaryButton';
export default function SignupScreen() {
  return (
    <ScrollView>
        <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require("../assets/images/IndusAchieverLogo.png")}
        />
        </View>
        <Text style={styles.infoText}>Kindly scan your front and back side {'\n'}of your university ID card</Text>
        <View style={styles.cameraButtonContainer}>
            <PrimaryButton iconVisible={true}
          iconName="camera-retro"
          size={responsiveFontSize(3)}
          color={Colors.blue}>Camera</PrimaryButton>
        </View>
        <Text style={styles.infoText2}>Having trouble using the camera ?</Text>
        <Card>
            <View>
            <TextInputField
            title="Enrollnment Number:"
            iconName={"user-tag"}
            iconStyle={{ marginRight: responsiveWidth(3.9) }}
            size={responsiveFontSize(4)}
            placeholder="Enter Username"
          />
          <TextInputField
            title="Password:"
            iconName={"lock"}
            size={responsiveFontSize(4)}
            placeholder="Enter Password"
          />
          <TextInputField
            title="Emial:"
            iconName={"at"}
            iconStyle={{ marginRight: responsiveWidth(3.9) }}
            size={responsiveFontSize(4)}
            placeholder="Enter Email"
          />
          <TextInputField
            title="Name:"
            iconName={"user"}
            size={responsiveFontSize(4)}
            placeholder="Enter Name"
          />
            </View>
            <View style={styles.buttonContainer}>
                <SecondaryButton textStyle={{color: Colors.darkred}} buttonStyle={{borderColor: Colors.darkred}}>Sign Up</SecondaryButton>
            </View>
        </Card>
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    image: {
        width: responsiveWidth(70),
        height: responsiveWidth(35),
    },
    containerImage: {
        flex: 1,
        alignItems: "center",
        marginVertical: responsiveHeight(5),
    },
    infoText: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2.4),
        color: Colors.darkred,
        fontWeight: 'semi-bold'
    },
    infoText2: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2)
    },
    cameraButtonContainer: {
        alignItems: 'center',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1)
    },
    buttonContainer: {
        margin: 15
    }
    
})