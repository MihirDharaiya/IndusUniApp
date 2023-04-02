import { StyleSheet, SafeAreaView,  StatusBar, Image, View, KeyboardAvoidingView} from 'react-native';
import NoInternet from './screens/NoInternet';
import SuccessPage from './screens/SuccessPage';
import NavigationBar from './Navigation/NavigationBar';


export default function App() {
  return (
    <SafeAreaView style={styles.rootScreen} >
    {/* <SuccessPage></SuccessPage> */}
    <NavigationBar></NavigationBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
