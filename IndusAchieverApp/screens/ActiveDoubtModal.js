import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
  import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
  import React from "react";
  import Colors from "../constants/Colors";
  import Card from "../components/Card";
  import SecondaryButton from "../components/SecondaryButton";
  export default function ActiveDoubtModal() {
    return (
      <View style={styles.rootContainer}>
        <Card cardStyle={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Enter Your reply"}
              autoCapitalize="none"
              numberOfLines={6}
            />
          </View>
          <SecondaryButton>SEND</SecondaryButton>
        </Card>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      width: responsiveWidth(87),
    },
    card: {
      borderWidth: 1,
    },
    titleText: {
      fontSize: responsiveFontSize(2.3),
      fontWeight: "600",
      marginVertical: 4,
    },
    input: {
      borderWidth: 2,
      borderColor: Colors.extralightgrey,
      borderRadius: 10,
      fontSize: responsiveFontSize(2.3),
      textAlignVertical: "top",
      padding: 8,
      marginBottom: 16,
    },
  });