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
import Colors from "../constants/Colors.js";
import TextInputField from "../components/TextInputField";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc} from 'firebase/firestore';

export default function Profile({navigation}) {

  const onSignOut=() => {
    const auth = getAuth();
signOut(auth).then(() => {
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
            source={require("../assets/images/Profile.png")}
            style={styles.image}
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
        />
        <TextInputField
          title="Email:"
          iconName={"at"}
          iconStyle={{ marginRight: responsiveWidth(2)}}
          size={responsiveFontSize(3.5)}
          placeholder="Email address"
          editable={false}
        />
        <TextInputField
          title="Enrollnment Number:"
          iconName={"id-badge"}
          iconStyle={{ marginRight: responsiveWidth(3.4)}}
          size={responsiveFontSize(3.8)}
          placeholder="IU12312"
          style={{ marginRight: 3 }}
          editable={false}
        />
        <TextInputField
          title="Branch:"
          iconName={"building"}
          iconStyle={{ marginRight: responsiveWidth(2.8)}}
          size={responsiveFontSize(3.4)}
          placeholder="Department name"
          editable={false}
        />
        <TextInputField
          title="Batch Year:"
          iconName={"id-card"}
          iconStyle={{ marginRight: responsiveWidth(2)}}
          size={responsiveFontSize(3.1)}
          placeholder="2017"
          editable={false}
        />
      </View>
      <View style={styles.buttonOuterContainer}>
        <SecondaryButton
          iconVisible={true}
          iconName="sign-out-alt"
          size={responsiveFontSize(3)}
          color={Colors.blue}
          textStyle={{ color: Colors.blue }}
          onPress={()=> onSignOut()}
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
    borderRadius: 17,
    margin: 8,
    alignItems: "center",
    marginTop: 16,
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
