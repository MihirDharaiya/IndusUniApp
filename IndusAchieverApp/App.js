import { StyleSheet, SafeAreaView,  StatusBar, Image, View, KeyboardAvoidingView} from 'react-native';
import BottomNavigationBar from './Navigation/BottomNavigationBar';


export default function App() {
  return (
    <KeyboardAvoidingView style={styles.rootScreen} enabled={true} behavior="padding">
    <SafeAreaView style={styles.rootScreen} >
    <BottomNavigationBar></BottomNavigationBar>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: { paddingLeft: 16 },
    bellBox: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
});
