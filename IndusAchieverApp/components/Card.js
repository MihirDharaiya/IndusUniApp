import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { View, StyleSheet } from "react-native";

import Colors from "../constants/Colors.js";
function Card({ children }) {
  return <View style={styles.cardContainer}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: responsiveHeight(1),
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
