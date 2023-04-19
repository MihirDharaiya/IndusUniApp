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
  Linking,
  BackHandler,
  Platform
} from "react-native";
import Colors from "../constants/Colors.js";
import TextInputField from "../components/TextInputField";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { getBytes, getStorage, ref, uploadBytes } from "firebase/storage";

export default function Profile({ navigation }) {
  const storage = getStorage(app);
  const db = getFirestore(app);
  const auth = getAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollnmentNumber, setenrollnmentNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [image, setImage] = useState(null);
  // const [profileImg, setProfileImg] = useState("");
  const userData = doc(db, "users", auth.currentUser.uid);
  const showData = async () => {
    let user = await AsyncStorage.getItem('users');
    user = JSON.parse(user);
    // console.log(typeof user, user);
    setName(user.name);
    setEmail(user.email);
    setenrollnmentNumber(user.enrollnmentNumber);
    setBatchYear(user.batchYear);
    setBranch(user.branch);
    setImage(user.profileImg)
  };
  const clearData = () => {
    AsyncStorage.clear();
  }

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    console.log(result);
    if (!result.canceled) {
      const res = result.uri.split("ImagePicker/")[1].trim()
      setImage(result.uri);
      const img = await fetch(result.uri);
      const by = await img.blob();
      const refs = ref(storage, auth.currentUser.uid)
      uploadBytes(refs, by).then(() => {
        console.log(res);
        updateDoc(userData, {
          profileImg: result.uri
        })
      });
    }
  }
  useEffect(() => {

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert("No permission")
        }
      }
    })();
    showData();
    clearData();
    const backAction = () => {
      navigation.navigate("HomeScreen");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const onSignOut = async () => {
    const auth = getAuth();
    await AsyncStorage.removeItem("users");
    signOut(auth).then(() => {
      clearData();
      navigation.navigate('LoginScreen')
    }).catch((error) => {
      alert('Something went wrong please try again !')
    });
  }
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <TouchableHighlight
          style={[
            styles.profileImgContainer,
            { borderColor: "black", borderWidth: 2 },
          ]}
        >
          <Image
            style={styles.image}
            source={{ uri: image }}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.editButtonOuterContainer}>
        <View>
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
        <View>
          <PrimaryButton
            textNotVisible={true}
            iconVisible={true}
            style={styles.iconRight}
            iconName="link"
            size={responsiveFontSize(2.3)}
            color={Colors.white}
            onPress={() => {
              navigation.navigate("SocailMediaScreen");
            }}
          ></PrimaryButton>
        </View>
      </View>
      <View style={styles.inputFieldsContainer}>
        <TextInputField
          title="Name:"
          iconName={"user-alt"}
          iconStyle={{ marginRight: responsiveWidth(2) }}
          size={responsiveFontSize(3.5)}
          placeholder="Name"
          editable={false}
          enteredValue={name}
          textStyle={{ color: Colors.black }}
        />
        <TextInputField
          title="Email:"
          iconName={"at"}
          iconStyle={{ marginRight: responsiveWidth(2) }}
          size={responsiveFontSize(3.5)}
          placeholder="Email address"
          editable={false}
          enteredValue={email}
          multiline={true}
          textStyle={{ color: Colors.black }}
        />
        <TextInputField
          title="Enrollnment Number:"
          iconName={"id-badge"}
          iconStyle={{ marginRight: responsiveWidth(3.4) }}
          size={responsiveFontSize(3.8)}
          placeholder="IU12312"
          style={{ marginRight: 3 }}
          editable={false}
          enteredValue={enrollnmentNumber}
          textStyle={{ color: Colors.black }}
        />
        <TextInputField
          title="Branch:"
          iconName={"building"}
          iconStyle={{ marginRight: responsiveWidth(2.8) }}
          size={responsiveFontSize(3.4)}
          placeholder="Department name"
          editable={false}
          enteredValue={branch}
          textStyle={{ color: Colors.black }}
        />
        <TextInputField
          title="Batch Year:"
          iconName={"id-card"}
          iconStyle={{ marginRight: responsiveWidth(2) }}
          size={responsiveFontSize(3.1)}
          placeholder="2017"
          editable={false}
          enteredValue={batchYear}
          textStyle={{ color: Colors.black }}
        />
      </View>
      <View style={styles.buttonOuterContainer}>
        <View style={{ width: responsiveWidth(50) }}>
          <PrimaryButton
            iconVisible={true}
            iconName="envelope"
            size={responsiveFontSize(3)}
            color={Colors.white}
            textStyle={{ color: Colors.white, fontSize: responsiveFontSize(2.5), marginVertical: 2.5 }}
            onPress={() => {
              Linking.openURL(
                "mailto: mihirdharaiya.19.cs@iite.indusuni.ac.in?subject=Feedback Related to the Student Application&body=" +
                `${"\n"} Regards, ${"\n"} ${name} ${"\n"} ${enrollnmentNumber} ${"\n"} ${branch}, ${batchYear}`
              );
            }}
          >
            FeedBack
          </PrimaryButton>
        </View>
        <View style={{ width: responsiveWidth(45) }}>
          <SecondaryButton
            iconVisible={true}
            iconName="sign-out-alt"
            size={responsiveFontSize(3)}
            color={Colors.blue}
            textStyle={{ color: Colors.blue, fontSize: responsiveFontSize(2.4) }}
            onPress={() => onSignOut()}
          >
            Log Out
          </SecondaryButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  inputFieldsContainer: {
    paddingHorizontal: responsiveWidth(5),
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
    borderRadius: 50,
  },

  editButtonOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(10),
  },
  buttonOuterContainer: {
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  editButtonInnerContainer: {
    width: responsiveWidth(70),
    height: responsiveHeight(10)
  },
  editPhone: {
    flexDirection: 'row'
  },
  editIcon: {
    // paddingTop: 10
  }
});
