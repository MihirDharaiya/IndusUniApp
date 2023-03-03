import { StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
import PrimaryButton from '../components/PrimaryButton';
import  Colors  from '../constants/Colors';
import Card from '../components/Card';
import TextInputField from '../components/TextInputField'
import SecondaryButton from '../components/SecondaryButton';
import {app} from '../firebase/firebase';
import { useState } from 'react';
import { getAuth, onAuthStateChanged, User,createUserWithEmailAndPassword } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc} from 'firebase/firestore';

export default function SignupScreen({navigation}) {
  const auth=getAuth();
  const db = getFirestore(app);

  const [enrollnmentNumber, setenrollnmentNumber] = useState('');   
  const [password, setPassword] = useState('');  
  const [confirmPassword, setconfirmPassword] = useState('');    
  const [name, setName] = useState('');   
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const addUser = ()=>{
    const reg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if(!(reg.test(email)===true)){
      setError('Please Enter Valid University Email !!')
    }
    else if(enrollnmentNumber=='' || enrollnmentNumber.length != 12 || !enrollnmentNumber.startsWith('IU')){
      
      setError('Please Enter Valid Enrollnment Number !!')
    }
    else if(name==''){
      setError('Please Enter Valid Name')
    }
    else if(password=='' || password!=confirmPassword || password.length<=8){
      setError('Pleaser Enter Valid Password')
    }
    else{
      setError('');
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
        const user = userCredential.user;             
        console.log("User Added :",user);  
        setDoc(doc(db, "users",user.uid), {
          email: email,
          name: name,
          enrollnmentNumber: enrollnmentNumber
        }).then(()=>{
          navigation.navigate('tabClientNavigator')
        });
      })            
      .catch((error) => {
        console.log("Error : ",error)});               
    }
  }

  return (
    <ScrollView style={styles.rootContainer}>
        <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require("../assets/images/IndusAchieverLogo.png")}
        />
        </View>
        <Text style={styles.infoText}>Kindly Enter Your University Email Only</Text>
        <Card>
            <View>
            <TextInputField
            title="Name:"
            iconName={"user-alt"}
            size={responsiveFontSize(4)}
            placeholder="Enter Name"
            enteredValue={name}
            enteredValueHandler={(val) => setName(val)}
          />
          <TextInputField
            title="Email:"
            iconName={"at"}
            iconStyle={{ marginRight: responsiveWidth(3.9) }}
            size={responsiveFontSize(4)}
            placeholder="Enter Email"
            enteredValue={email}
            enteredValueHandler={(val) =>setEmail(val)}
          />
            <TextInputField
            title="Enrollnment Number:"
            iconName={"id-badge"}
            iconStyle={{ marginRight: responsiveWidth(3.9) }}
            size={responsiveFontSize(4)}
            placeholder="Enter Enrollnment"
            enteredValue={enrollnmentNumber}
            enteredValueHandler={(val) =>setenrollnmentNumber(val)}
          />
          <TextInputField
            title="Password:"
            iconName={"lock"}
            size={responsiveFontSize(4)}
            placeholder="Enter Password"
            enteredValue={password}
            enteredValueHandler={(val) =>setPassword(val)}
            secureTextEntry={true}
          />
          <TextInputField
            title="Confirm Password:"
            iconName={"lock"}
            size={responsiveFontSize(4)}
            placeholder="Enter Password"
            enteredValue={confirmPassword}
            enteredValueHandler={(val) =>setconfirmPassword(val)}
            secureTextEntry={true}
          />
          
            </View>
            {
        error==''?null:(<View style={{paddingTop: 10}}>
          <Text style={{color: Colors.red, textAlign: 'center'}}>
            {error}
          </Text>
        </View>)
      }
            <View style={styles.buttonContainer}>
                <SecondaryButton 
                textStyle={{color: Colors.darkred}}
                buttonStyle={{borderColor: Colors.darkred}}
                onPress={()=> {addUser()}}
                >Sign Up</SecondaryButton>
            </View>
        </Card>
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    backgroundColor: Colors.white
  },
    image: {
        width: responsiveWidth(70),
        height: responsiveWidth(35),
    },
    containerImage: {
        flex: 1,
        alignItems: "center",
        marginVertical: responsiveHeight(5),
    },
    infoText: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2.4),
        color: Colors.darkred,
        fontWeight: 'bold',
        marginBottom: responsiveHeight(4)
    },
    infoText2: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2)
    },
    cameraButtonContainer: {
        alignItems: 'center',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1)
    },
    buttonContainer: {
        margin: 15
    }
    
})