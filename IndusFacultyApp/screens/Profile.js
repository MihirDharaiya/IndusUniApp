import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Linking,
  BackHandler,
} from "react-native";
import Colors from "../constants/Colors.js";
import TextInputField from "../components/TextInputField";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { app, storageRef } from "../firebase";
import "firebase/storage";
import * as ImagePicker from "expo-image-picker";
export default function Profile({ navigation }) {
  const isFocused = useIsFocused();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [position, setPosition] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);

  const showData = async () => {
    let user = await AsyncStorage.getItem("users");
    user = JSON.parse(user);

    setName(user.fname);
    setEmail(user.femail);
    setBranch(user.fbranch);
    setPosition(user.fposition);
    setId(user.fid);
  };
  const clearData = () => {
    AsyncStorage.clear();
  };
  useEffect(() => {
    if (isFocused) {
      showData();
      clearData();
    }
    const backAction = () => {
      navigation.navigate("Home");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });
  const onSignOut = async () => {
    const auth = getAuth();
    await AsyncStorage.removeItem("users");
    signOut(auth)
      .then(() => {
        clearData();

        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        alert("Something went wrong please try again !");
      });
  };
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <View
          style={[
            styles.profileImgContainer,
            { borderColor: "black", borderWidth: 2 },
          ]}
        >
          <Image
            source={require("../assets/images/Profile.png")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.buttonOuterContainer}>
        <View style={styles.buttonInnerContainer}>
          <PrimaryButton
            textNotVisible={true}
            iconVisible={true}
            style={styles.iconRight}
            iconName="upload"
            size={responsiveFontSize(2.3)}
            color={Colors.white}
          ></PrimaryButton>
        </View>
      </View>
      <View style={styles.inputFieldsContainer}>
        <TextInputField
          title="Name:"
          iconName={"user-alt"}
          size={responsiveFontSize(3.5)}
          placeholder={name}
          editable={false}
        />
        <TextInputField
          title="Email:"
          iconName={"at"}
          size={responsiveFontSize(3.5)}
          placeholder={email}
          editable={false}
          multiline={true}
        />
        <TextInputField
          title="User ID No.:"
          iconName={"user-tag"}
          size={responsiveFontSize(3.5)}
          placeholder={id}
          style={{ marginRight: 3 }}
          editable={false}
        />
        <TextInputField
          title="Department:"
          iconName={"building"}
          size={responsiveFontSize(3.5)}
          placeholder={branch}
          editable={false}
        />
        <TextInputField
          title="Position:"
          iconName={"user-graduate"}
          size={responsiveFontSize(3.5)}
          placeholder={position}
          editable={false}
        />
      </View>
      <View style={styles.signOutButtonContainer}>
        <PrimaryButton
          iconVisible={true}
          iconName="envelope"
          size={responsiveFontSize(3)}
          onPress={() => {
            Linking.openURL(
              "mailto: jainishpatel.19.cs@iite.indusuni.ac.in?subject=Feedback Related to the Faculty Application&body=" +
                `${"\n"} Regards, ${"\n"} ${name} ${"\n"} ${id} ${"\n"} ${branch}, ${position}`
            );
          }}
        >
          Feedback
        </PrimaryButton>
        <SecondaryButton
          iconVisible={true}
          iconName="sign-out-alt"
          size={responsiveFontSize(3)}
          color={Colors.blue}
          textStyle={{ color: Colors.blue }}
          onPress={() => onSignOut()}
        >
          Log Out
        </SecondaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: responsiveHeight(2.5),
    marginBottom: -12,
  },
  profileImgContainer: {
    width: responsiveWidth(27),
    height: responsiveWidth(27),
    borderRadius: 50,
    alignItems: "center",
    paddingTop: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: responsiveWidth(50),
  },

  buttonOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(10),
  },
  buttonInnerContainer: {
    flexDirection: "row",
  },
  signOutButtonContainer: {
    justifyContent: "center",
    borderRadius: 17,
    margin: 8,
    alignItems: "center",
    marginTop: 16,
    flexDirection: "row",
  },
});
