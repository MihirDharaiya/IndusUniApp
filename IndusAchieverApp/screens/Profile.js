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
  BackHandler
} from "react-native";
import Colors from "../constants/Colors.js";
import TextInputField from "../components/TextInputField";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import React, { useState, useEffect} from 'react';
import { getAuth, signOut } from "firebase/auth";
import {getFirestore, getDoc, doc, query, onSnapshot, setDoc} from 'firebase/firestore';
import { getStorage,ref,uploadBytes } from "firebase/storage";
import {app} from '../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserPermissions from "../utilities/UserPermissions.js";
import { useIsFocused } from "@react-navigation/native";

export default function Profile({navigation}) {

const db = getFirestore(app);
const auth=getAuth();
// const storage = getStorage(app);
const isFocused = useIsFocused();
const [name, setName] = useState("");   
const [email, setEmail] = useState("");
const [enrollnmentNumber, setenrollnmentNumber] = useState("");  
const [branch, setBranch] = useState("");  
const [batchYear, setBatchYear] = useState("");  
const [image, setImage] = useState(null);

  // const selectImage = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //     alert('Sorry, we need camera roll permissions to make this work!');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync();
  //   if (!result.canceled) {
  //     setImage(result.uri);
  //     console.log(result.uri);
  //     uploadImage(result.uri);
  //   }
  // };
  // const uploadImage = async (uri) => {
  //   const storageRef = ref(uri);
  //   return storageRef
  // };

const showData = async () => {
let user = await AsyncStorage.getItem('users');
    user = JSON.parse(user);
    console.log(typeof user, user);
    setName(user.name);
    setEmail(user.email);
    setenrollnmentNumber(user.enrollnmentNumber);
    setBatchYear(user.batchYear);
    setBranch(user.branch);
  };
const clearData = () => {
    AsyncStorage.clear();
  }

// useEffect(()=>{
//   const getUser = async () => {
//     const docRef = doc(db, "users",auth.currentUser.uid);
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       setName(docSnap.data().name)
//       setEmail(docSnap.data().email)
//       setenrollnmentNumber(docSnap.data().enrollnmentNumber)
//       setBatchYear(docSnap.data().batchYear)
//       setBranch(docSnap.data().branch)
  
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//     }
//     getUser();
// },[]);
useEffect(()=>{
  if (isFocused) {
  showData();
  clearData();
  const backAction = () => {
    navigation.navigate("HomeScreen")
    return true;
  };
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );
  return () => backHandler.remove();
  }
},[isFocused]);

const onSignOut= async() => {
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
      <View>
      <View style={styles.imageContainer}>
        <TouchableHighlight
          style={[
            styles.profileImgContainer,
            { borderColor: "black", borderWidth: 2 },
          ]}
        >
          <Image
            style={styles.image}
            source={require("../assets/images/Profile.png")}
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
          iconStyle={{ marginRight: responsiveWidth(2)}}
          size={responsiveFontSize(3.5)}
          placeholder="Name"
          editable={false}
          enteredValue={name}
        />
        <TextInputField
          title="Email:"
          iconName={"at"}
          iconStyle={{ marginRight: responsiveWidth(2)}}
          size={responsiveFontSize(3.5)}
          placeholder="Email address"
          editable={false}
          enteredValue={email}
          multiline={true}
        />
        <TextInputField
          title="Enrollnment Number:"
          iconName={"id-badge"}
          iconStyle={{ marginRight: responsiveWidth(3.4)}}
          size={responsiveFontSize(3.8)}
          placeholder="IU12312"
          style={{ marginRight: 3 }}
          editable={false}
          enteredValue={enrollnmentNumber}
        />
        <TextInputField
          title="Branch:"
          iconName={"building"}
          iconStyle={{ marginRight: responsiveWidth(2.8)}}
          size={responsiveFontSize(3.4)}
          placeholder="Department name"
          editable={false}
          enteredValue={branch}
        />
        <TextInputField
          title="Batch Year:"
          iconName={"id-card"}
          iconStyle={{ marginRight: responsiveWidth(2)}}
          size={responsiveFontSize(3.1)}
          placeholder="2017"
          editable={false}
          enteredValue={batchYear}
        />
      </View>
      <View style={styles.signOutButtonContainer}>
        <View style={{width:responsiveWidth(50)}}>
        <PrimaryButton
          iconVisible={true}
          iconName="envelope"
          size={responsiveFontSize(3)}
          onPress={() => {
            Linking.openURL(
              "mailto: mihirdharaiya.19.cs@iite.indusuni.ac.in?subject=Feedback Related to the Student Application&body=" +
                `${"\n"} Regards, ${"\n"} ${name} ${"\n"} ${branch}, ${batchYear}`
            );
          }}
        >
          Feedback
        </PrimaryButton>
        </View>
        <View style={{width:responsiveWidth(45)}}>
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
    // alignItems: "center",
    marginTop: 16,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  editButtonInnerContainer: {
    width: responsiveWidth(70),
    height: responsiveHeight(10)
  },
  editPhone: {
    flexDirection: 'row'
  },
  signOutButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    flexDirection: "row",
    marginHorizontal: 10,
  },
  editIcon: {
    // paddingTop: 10
  }
});
