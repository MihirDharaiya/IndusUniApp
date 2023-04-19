import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./Navigation/RootNavigation";
import { SignInContextProvider } from "./context/AuthContext";
import InternetConnectionAlert from "react-native-internet-connection-alert";
export default function App() {
  return (
    <InternetConnectionAlert>
      <SignInContextProvider>
        <SafeAreaView style={styles.rootScreen}>
          <StatusBar style="auto" />
          <RootNavigator />
        </SafeAreaView>
      </SignInContextProvider>
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
