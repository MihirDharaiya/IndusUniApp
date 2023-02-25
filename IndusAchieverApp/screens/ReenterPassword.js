import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import TextInputField from "../components/TextInputField";
import Colors from "../constants/Colors";
export default function ReenterPassword() {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.containerImage}>
        <Image
          style={styles.logo}
          source={require("../assets/images/IndusAchieverLogo.png")}
        />
      </View>
      <Card>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/ReenterPassIcon.png")}
          />
        </View>
        <View>
          <TextInputField
            iconVisible={true}
            iconName={"key"}
            title="Password:"
            size={responsiveFontSize(4)}
            placeholder="***********"
          />
          <TextInputField
            title="Re-enter Password:"
            iconName={"lock"}
            size={responsiveFontSize(4)}
            placeholder="***********"
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton>Confirm</PrimaryButton>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: responsiveWidth(70),
    height: responsiveWidth(35),
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
  containerImage: {
    flex: 1,
    alignItems: "center",
    marginVertical: responsiveHeight(5),
  },
  buttonContainer: {
    marginVertical: responsiveHeight(4),
  },
});
