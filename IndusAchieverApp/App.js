import { StyleSheet, SafeAreaView } from "react-native";
import NavigationBar from "./Navigation/NavigationBar";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log("Connection State: ", connectionState);
      }}
    >
      <SafeAreaView style={styles.rootScreen}>
        <StatusBar style="auto" />
        <NavigationBar />
      </SafeAreaView>
    </InternetConnectionAlert>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    background: "#fff",
  },
});
