import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import NavigationBar from "./Navigation/NavigationBar";
export default function App() {
  return (
    <SafeAreaView style={styles.rootScreen}>
      <StatusBar style="auto" />
      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    background: "#fff",
  },
});
