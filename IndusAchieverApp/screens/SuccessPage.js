import { StyleSheet, Text, View, Image, Modal } from "react-native";
import { React, useState, useEffect } from "react";
import Colors from "../constants/Colors";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const SuccessPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalVisible(false);
      navigation.navigate("ActiveDoubts");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Modal
      style={styles.mainContianer}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.mainContianer}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Your Doubt Has Been {"\n"} Created Successfully !!
            </Text>
          </View>
        </View>
        <View style={styles.containerImage}>
          <Image
            style={styles.image2}
            source={require("../assets/images/Success.gif")}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SuccessPage;

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: Colors.green,
    fontSize: responsiveFontSize(3.5),
    fontWeight: "600",
  },
  image2: {
    width: responsiveWidth(80),
    height: responsiveWidth(65),
    marginBottom: responsiveHeight(20),
  },
  containerImage: {
    // marginVertical: responsiveHeight(5),
  },
});
