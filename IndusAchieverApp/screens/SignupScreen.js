import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import TextInputField from "../components/TextInputField";
import SecondaryButton from "../components/SecondaryButton";
import { app } from "../firebase/firebase";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  VerifyEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTogglePasswordVisibility } from "../components/ViewPassword";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function SignupScreen({ navigation }) {
  const auth = getAuth();
  const db = getFirestore(app);

  const [enrollnmentNumber, setenrollnmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  const addUser = async () => {
    const reg = /[a-z]*\.[0-9]+\.[a-z]+@iite\.indusuni\.ac\.in/i;
    if (!reg.test(email)) {
      setError("Please Enter Valid University Email !!");
    } else if (
      enrollnmentNumber == "" ||
      enrollnmentNumber.length != 12 ||
      !enrollnmentNumber.startsWith("IU")
    ) {
      setError("Please Enter Valid Enrollnment Number !!");
    } else if (name == "") {
      setError("Please Enter Valid Name");
    } else if (
      password == "" ||
      password != confirmPassword ||
      password.length <= 8
    ) {
      setError("Pleaser Enter Valid Password");
    } else {
      setError("");
      let str = email;
      let a = str.indexOf(".");
      let b = str.indexOf("@");
      let x = "";
      for (let i = a + 1; i < b; i++) {
        x += str.charAt(i);
      }
      var arr = x.split(".");
      if (arr[1] === "cse") {
        arr[1] = "cs";
      }
      const user = collection(db, "users");
      const q = query(
        user,
        where("enrollnmentNumber", "==", enrollnmentNumber)
      );
      const docSnap = await getDocs(q);
      if (docSnap.empty) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            sendEmailVerification(user);
            setDoc(doc(db, "users", user.uid), {
              email: email,
              name: toTitleCase(name),
              enrollnmentNumber: enrollnmentNumber,
              branch: arr[1].toUpperCase(),
              batchYear: "20" + arr[0],
              uid: auth.currentUser.uid,
              profileImg: "",
              tags: [],
            }).then(() => {
              navigation.navigate("VerifyEmail");
              // AsyncStorage.setItem("users", JSON.stringify(data));
            });
          })
          .catch((error) => {
            // const errorCode = error.code.replace("auth/", "");
            if (error.code === "auth/email-already-in-use") {
              setEmail("");
              Alert.alert("Email address is already inuse");
            }
            console.log("Error : ", error);
          });
      } else {
        setenrollnmentNumber("");
        Alert.alert("Enrollnment Number is already inuse");
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.rootContainer}>
      <ImageBackground
        style={styles.building}
        source={require("../assets/images/IndusMainBuilding.png")}
      >
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={require("../assets/images/IndusAchieverLogo.png")}
          />
        </View>
        <Text style={styles.infoText}>
          Kindly Enter Your University Email Only
        </Text>
        <Card>
          <View>
            <TextInputField
              title="Name:"
              iconName={"user-alt"}
              size={responsiveFontSize(3.7)}
              placeholder="Enter Name"
              enteredValue={name}
              enteredValueHandler={(val) => setName(val)}
              multiline={true}
            />
            <TextInputField
              title="Email:"
              iconName={"at"}
              iconStyle={{ marginRight: responsiveWidth(2) }}
              size={responsiveFontSize(4)}
              placeholder="Enter Email"
              enteredValue={email}
              enteredValueHandler={(val) => setEmail(val)}
              multiline={true}
            />
            <TextInputField
              title="Enrollnment Number:"
              iconName={"id-badge"}
              iconStyle={{ marginRight: responsiveWidth(3.9) }}
              size={responsiveFontSize(4)}
              placeholder="Enter Enrollnment"
              enteredValue={enrollnmentNumber}
              enteredValueHandler={(val) => setenrollnmentNumber(val)}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <View style={styles.EyeContainer}>
                <Icon name={rightIcon} style={styles.eyeIcon} />
              </View>
            </Pressable>
            <TextInputField
              title="Password:"
              iconName={"lock"}
              size={responsiveFontSize(4)}
              placeholder="Enter Password"
              enteredValue={password}
              enteredValueHandler={(val) => setPassword(val)}
              secureTextEntry={passwordVisibility}
            />
            <TextInputField
              title="Confirm Password:"
              iconName={"lock"}
              size={responsiveFontSize(4)}
              placeholder="Enter Password"
              enteredValue={confirmPassword}
              enteredValueHandler={(val) => setconfirmPassword(val)}
              secureTextEntry={passwordVisibility}
            />
          </View>
          {error == "" ? null : (
            <View style={{ paddingTop: 10 }}>
              <Text style={{ color: Colors.red, textAlign: "center" }}>
                {error}
              </Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <SecondaryButton
              textStyle={{ color: Colors.darkred }}
              buttonStyle={{ borderColor: Colors.darkred }}
              onPress={() => {
                addUser();
              }}
            >
              Sign Up
            </SecondaryButton>
          </View>
        </Card>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.white,
  },
  image: {
    width: responsiveWidth(70),
    height: responsiveWidth(35),
  },
  containerImage: {
    flex: 1,
    alignItems: "center",
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(3),
  },
  infoText: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    color: Colors.darkred,
    fontWeight: "bold",
    marginBottom: responsiveHeight(4),
    paddingLeft: 5,
    paddingRight: 5,
  },
  infoText2: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
  },
  cameraButtonContainer: {
    alignItems: "center",
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
  buttonContainer: {
    margin: 15,
  },
  textInputView: {
    width: responsiveWidth(70),
  },
  building: {
    height: "100%",
  },
  eyeIcon: {
    color: "#232323",
    fontSize: responsiveFontSize(2.3),
  },
  EyeContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 16,
  },
});
