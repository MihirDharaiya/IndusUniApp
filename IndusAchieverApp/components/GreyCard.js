import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export default function GreyCard({children}) {
  return <View style={styles.cardContainer}>{children}</View>;

}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: responsiveHeight(1),
    // marginHorizontal: 24,
    padding: 6,
    backgroundColor: Colors.lightgrey,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
})