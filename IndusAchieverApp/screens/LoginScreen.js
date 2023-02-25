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
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import TextInputField from "../components/TextInputField";

export default function LoginScreen() {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require("../assets/images/IndusAchieverLogo.png")}
        />
      </View>
      <Card>
        <View>
          <TextInputField
            title="Username:"
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

          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.buttonInnerContainer, styles.pressed]
                : styles.buttonInnerContainer
            }
          >
            <View style={styles.forgotPassContainer}>
              <Text style={styles.forgotPass}>Forgot Password?</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton>LogIn</PrimaryButton>
        </View>
      </Card>

      <View style={styles.signUpContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 16,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text
              style={{
                width: 50,
                textAlign: "center",
                color: Colors.darkred,
                fontSize: responsiveFontSize(2.5),
              }}
            >
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
        <SecondaryButton>Sign Up</SecondaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    marginHorizontal: 16,
  },
  containerImage: {
    flex: 1,
    alignItems: "center",
    marginVertical: responsiveHeight(5),
  },
  image: {
    width: responsiveWidth(70),
    height: responsiveWidth(35),
  },
  mainContainer: {
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 40,
    fontWeight: 'bold'
  },
  pressed: {
    opacity: 0.5,
  },
  forgotPassContainer: {
    marginRight: 12,
    marginBottom: responsiveHeight(6),
  },
  forgotPass: {
    fontSize: responsiveFontSize(1.9),
    textAlign: "right",
    color: Colors.darkred,
  },
  buttonContainer: {
    marginBottom: responsiveHeight(5),
  },
});
