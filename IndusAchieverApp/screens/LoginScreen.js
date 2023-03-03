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
import { useState,useEffect } from "react";
import { getAuth, onAuthStateChanged, User,signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  const onSignIn = () => {
    const reg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if(!(reg.test(email)===true)){
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
      setEmail('');
      setPassword('');
      navigation.navigate('tabClientNavigator')
    })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError('Invalid User !')
      });
    }
  }

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
            iconName={"user-alt"}
            iconStyle={{ marginRight: responsiveWidth(3) }}
            size={responsiveFontSize(3.7)}
            placeholder="Enter Username"
            enteredValue={email}
            enteredValueHandler={text => setEmail(text)}
          />
          <TextInputField
            title="Password:"
            iconName={"lock"}
            size={responsiveFontSize(4)}
            placeholder="Enter Password"
            enteredValue={password}
            enteredValueHandler={password => setPassword(password)}
            secureTextEntry={true}
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
});
