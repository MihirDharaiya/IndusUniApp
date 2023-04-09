import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import TextInputField from "../components/TextInputField";
import { useState,useEffect } from "react";
import {getFirestore, getDoc, doc, query, onSnapshot} from 'firebase/firestore';
import { getAuth, User,signInWithEmailAndPassword,sendEmailVerification } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {app} from '../firebase/firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useTogglePasswordVisibility } from "../components/ViewPassword";
import Icon from "react-native-vector-icons/FontAwesome5";


export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [enrollnmentNumber, setenrollnmentNumber] = useState('');  
  const [branch, setBranch] = useState('');  
  const [batchYear, setBatchYear] = useState('');  
  const [error, setError] = useState('');
  const auth = getAuth();
  const db = getFirestore(app);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

const clearData = () => {
  AsyncStorage.clear();
};
  const onSignIn = () => {
    const reg =  /[a-z]*\.[0-9]+\.[a-z]+@iite\.indusuni\.ac\.in/i;
    if(!reg.test(email) && email !== "achivtest@gmail.com" ){
      setError('Please Enter Valid University Email !!')
    }
    else if(password=='' || password.length<=8){
      setError('Pleaser Enter Valid Password')
    }
    else{
      setError("")
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified && email !== "achivtest@gmail.com" ) {
          navigation.navigate("VerifyEmail");
          sendEmailVerification(user);
        } else {
          setEmail('');
          setPassword('');
          clearData();
          navigation.navigate('Overview')
          AsyncStorage.setItem('users', JSON.stringify(fetchData()));
        }
    })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError('Invalid User !')
      setEmail('');
      setPassword('');
      });
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
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
            iconName={"user-alt"}
            iconStyle={{ marginRight: responsiveWidth(2)}}
            size={responsiveFontSize(3.7)}
            placeholder="Enter Username"
            enteredValue={email}
            enteredValueHandler={text => setEmail(text)}
            multiline={true}
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
            enteredValueHandler={password => setPassword(password)}
            secureTextEntry={passwordVisibility}
          />

          <Pressable
          onPress={()=> {
            navigation.navigate('ForgotPassword')
          }}
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
        {
        error==''?null:(<View style={{paddingBottom: 10}}>
          <Text style={{color: Colors.red, textAlign: 'center'}}>
            {error}
          </Text>
        </View>)
      }
        <View style={styles.buttonContainer}>
          <PrimaryButton
          onPress={()=> onSignIn()}
          >LogIn</PrimaryButton>
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
        <SecondaryButton
        onPress={()=> {
          navigation.navigate('SignUpScreen')
        }}
        >Sign Up</SecondaryButton>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
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
    backgroundColor: Colors.white
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
  building: {
    flex: 1,
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
