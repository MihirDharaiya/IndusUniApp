import { StyleSheet, SafeAreaView,  StatusBar, Image, View, KeyboardAvoidingView} from 'react-native';
import BottomNavigationBar from './Navigation/BottomNavigationBar';
import NoInternet from './screens/NoInternet';
import SuccessPage from './screens/SuccessPage';


export default function App() {
  return (
    <SafeAreaView style={styles.rootScreen} >
    <BottomNavigationBar></BottomNavigationBar>
    {/* <SuccessPage></SuccessPage> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
