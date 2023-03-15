import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/Colors";
export default function VerifyEmail({ navigation }) {
  return (
    <ScrollView style={styles.rootContainer}>
      <ImageBackground
        style={styles.building}
        source={require("../assets/images/IndusMainBuilding.png")}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/IndusFacultyLogo.png")}
          />
        </View>
        <Card>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../assets/images/ResetPasswordLinkSendIcon.png")}
            />
          </View>
          <View style={styles.mainTextContainer}>
            <Text style={styles.mainText}>Check Your Email !!</Text>
            <Text style={styles.subText}>
              Follow the Link in the Email to Reset the Password.
            </Text>
          </View>
          <PrimaryButton
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            Login
          </PrimaryButton>
        </Card>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginVertical: 16,
    flex: 1,
    backgroundColor: Colors.white,
  },
  building: {
    height: responsiveHeight(100),
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: responsiveHeight(5),
  },
  logo: {
    width: responsiveWidth(70),
    height: responsiveWidth(35),
    marginVertical: 15,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
  },
  mainTextContainer: {
    padding: 2,
    marginVertical: 16,
  },

  mainText: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  subText: {
    fontSize: responsiveFontSize(2.3),
    textAlign: "center",
    color: Colors.grey,
  },
});
