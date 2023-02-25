import { StyleSheet, SafeAreaView,  StatusBar, ScrollView} from 'react-native';
import Colors from './constants/Colors';
import {MaterialIcons} from "@expo/vector-icons";
import LoginScreen from './screens/LoginScreen';
import EmailVerification from './screens/EmailVerification';
import ForgotPassword from './screens/ForgotPassword';
import Profile from './screens/Profile';
import ReenterPassword from './screens/ReenterPassword';
import SignupScreen from './screens/SignupScreen';
import TextInputBoxField from './components/TextInputBoxField';
import Notification from './screens/Notification'
import NavigationBar from './components/NavigationBar';
import HomeScreen from './screens/HomeScreen';
import CreateDoubtScreen from './screens/CreateDoubtScreen';
import SocailMediaScreen from './screens/SocailMediaScreen';
import ActiveDoubts from './screens/ActiveDoubts';
import PastDoubts from './screens/PastDoubts';
import AlumniProfile from './screens/AlumniProfile';
import Community from './screens/Community';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/FontAwesome";
import StudentProfile from './screens/StudentProfile';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function Navigation(){
  return <BottomTabs.Navigator 
  initialRouteName={"HomeScreen"}
  screenOptions={{
    tabBarActiveTintColor: Colors.red,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveBackgroundColor: Colors.extralightgrey
  }}>
    <BottomTabs.Screen name='PastDoubts'  component={PastDoubts} options={{tabBarIcon: ({size}) => <Icon name='clipboard-list' size={responsiveFontSize(3.3)} color={Colors.blue}/>}} />
    <BottomTabs.Screen name='Community' component={Community} options={{tabBarIcon: ({size}) => <Icon name='users' size={size} color={Colors.blue}/>}}/>
    <BottomTabs.Screen name='HomeScreen' component={HomeScreen} options={{tabBarIcon: ({size}) => <Icon name='home' size={size} color={Colors.blue}/>}}/>
    <BottomTabs.Screen name='ActiveDoubts' component={ActiveDoubts} options={{tabBarIcon: ({size}) => <Icons name='comment' size={size} color={Colors.blue}/>}}/>
    <BottomTabs.Screen name='Profile' component={Profile} options={{tabBarIcon: ({size}) => <Icon name='user-alt' size={size} color={Colors.blue}/>}}/>

  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <SafeAreaView style={styles.rootScreen} >
    {/* <LoginScreen></LoginScreen> */}
    {/* <EmailVerification></EmailVerification> */}
    {/* <ForgotPassword></ForgotPassword> */}
    {/* <ReenterPassword></ReenterPassword> */}
    {/* <SignupScreen></SignupScreen> */}
    {/* <CreateDoubtScreen></CreateDoubtScreen> */}
    {/* <SocailMediaScreen></SocailMediaScreen> */}
    {/* <AlumniProfile></AlumniProfile> */}
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Navigation' component={Navigation} options={{headerShown: false}}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    {/* <StudentProfile></StudentProfile> */}
    {/* <Community></Community> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
});
