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
  Platform,
} from "react-native";
import Colors from "../constants/Colors.js";
import TextInputField from "../components/TextInputField";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { app } from "../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getBytes,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
export default function Profile({ navigation }) {
  const isFocused = useIsFocused();
  const storage = getStorage(app);
  const auth = getAuth();
  const db = getFirestore(app);
  const default_prof = require("../assets/images/Profile.png");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [position, setPosition] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
  const userData = doc(db, "faculty", auth.currentUser.uid);
  const showData = async () => {
    let user = await AsyncStorage.getItem("users");
    user = JSON.parse(user);

    setName(user.fname);
    setEmail(user.femail);
    setBranch(user.fbranch);
    setPosition(user.fposition);
    setId(user.fid);
    setImage(user.profileImg);
  };
  const clearData = () => {
    AsyncStorage.clear();
  };
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    let finalImg = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: 300, height: 300 } }],
      { compress: 0.1, format: ImageManipulator.SaveFormat.PNG }
    );
    if (!finalImg.canceled) {
      const res = finalImg.uri.split("ImageManipulator/")[1].trim();
      setImage(finalImg.uri);
      const img = await fetch(finalImg.uri);
      const by = await img.blob();
      const refs = ref(
        storage,
        "gs://indusuniapp-df82f.appspot.com/" + auth.currentUser.uid
      );
      uploadBytes(refs, by).then(() => {
        // console.log(res);
        getDownloadURL(refs).then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();
          // console.log(url);
          updateDoc(userData, {
            profileImg: url,
          });
        });
      });
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("No permission");
        }
      }
    })();
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
            style={styles.image}
            source={image === "" ? default_prof : { uri: image }}
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
            onPress={PickImage}
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
    borderRadius: responsiveWidth(27) / 2,
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
    borderRadius: responsiveWidth(25) / 2,
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
