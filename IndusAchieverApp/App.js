import { StyleSheet, SafeAreaView} from 'react-native';
import NavigationBar from './Navigation/NavigationBar';
import { StatusBar } from "expo-status-bar";
import InternetConnectionAlert from "react-native-internet-connection-alert";

export default function App() {
  return (
    <InternetConnectionAlert>
    <SafeAreaView style={styles.rootScreen}>
    <StatusBar style="auto" />
    <NavigationBar></NavigationBar>
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
