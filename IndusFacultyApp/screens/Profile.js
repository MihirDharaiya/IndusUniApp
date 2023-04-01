import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Text,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../constants/Colors.js";
import TextInputField from "../components/TextInputField";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { app } from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// import { log } from "react-native-reanimated";
export default function Profile({ navigation }) {
  const isFocused = useIsFocused();
  const storage = getStorage(app);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [position, setPosition] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.uri);
      console.log(result.uri);
      uploadImage(result.uri);
    }
  };
  const uploadImage = async (uri) => {
    const storageRef = ref(uri);
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });
    // const response = await fetch(uri);
    // const blob = await response.blob();
    // const ref = storage().ref().child('profileImage');
    return storageRef;
  };
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
        <TouchableHighlight
          style={[
            styles.profileImgContainer,
            { borderColor: "black", borderWidth: 2 },
          ]}
        >
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableHighlight>
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
            onPress={selectImage}
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
          iconName="calendar"
          size={responsiveFontSize(3)}
          onPress={() => navigation.navigate("On a Break")}
        >
          On Leave
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
