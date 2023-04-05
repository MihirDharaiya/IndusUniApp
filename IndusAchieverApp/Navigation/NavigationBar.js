import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
  import { StyleSheet, Text, View, Image } from "react-native";
  import { NavigationContainer } from "@react-navigation/native";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import Ionicons from "react-native-vector-icons/FontAwesome5";
  import React, { useEffect } from "react";
  import Routes from "./Routes";
  import Colors from "../constants/Colors";
  import { getAuth } from "firebase/auth";
  import { app } from "../firebase/firebase";
  import { doc, getDoc, getFirestore } from "firebase/firestore";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import HomeScreen from "../screens/HomeScreen";
  import ActiveDoubts from "../screens/ActiveDoubts";
  import Community from "../screens/Community";
  import Profile from "../screens/Profile";
  import PastDoubts from "../screens/PastDoubts";
  import Splash from "../screens/Splash";
  import LoginScreen from "../screens/LoginScreen";
  import SignupScreen from "../screens/SignupScreen";
  import SocailMediaScreen from '../screens/SocailMediaScreen';
import FrequentlyAskedQuestion from '../screens/FrequentlyAskedQuestion';
import NotificationBell from '../components/NotificationBell';
import Notification from '../screens/Notification';
import ForgotPassword from '../screens/ForgotPassword';
import ReenterPassword from '../screens/ReenterPassword';
import EmailVerification from '../screens/EmailVerification';
import StudentProfile from '../screens/StudentProfile';
import AlumniProfile from "../screens/AlumniProfile";
import CreateDoubtScreen from "../screens/CreateDoubtScreen";
import FacultyList from "../screens/FacultyList";
import NoInternet from "../screens/NoInternet";
import VerifyEmail from "../screens/VerifyEmail";
import ViewDetails from "../screens/ViewDetails";
import SuccessPage from "../screens/SuccessPage";
import Icons from "react-native-vector-icons/FontAwesome";
import ReportStudent from '../screens/ReportStudent'


  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  
  const Home = "HomeScreen";
  const ActiveDoubt = "ActiveDoubts";
  const PastDoubt = "PastDoubts";
  const CommunityS = "Community";
  const ProfileS = "Profile";
  
  function Overview() {
    const auth = getAuth();
    const useruid = auth.currentUser.uid;
    const db = getFirestore(app);
    const getUserData = async () => {
      const a = await getDoc(doc(db, "users", useruid));
      AsyncStorage.setItem("users", JSON.stringify(a.data()));
      // console.log("In get user data",a.data());
      // console.log(useruid);
    };
  
    useEffect(() => {
      async function fetchData() {
        await AsyncStorage.removeItem("users");
        let user = await AsyncStorage.getItem("users");
        user = JSON.parse(user);
        // console.log(typeof user, user);
        if (!user) {
          getUserData();
        }
      }
      fetchData();
    });
    return (
      <BottomTabs.Navigator
        initialRouteName={Home}
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: () => {
            let iconName;
            let rn = route.name;
            if (rn === Home) {
              iconName = "home";
            } else if (rn === PastDoubt) {
              iconName = "clipboard-list";
            } else if (rn === ProfileS) {
              iconName = "user-alt";
            }
            else if (rn === CommunityS) {
                iconName = "users";
              }
            return (
              <Ionicons
                name={iconName}
                size={responsiveFontSize(3.3)}
                color={Colors.blue}
              />
            );
          },
          headerStyle: {
            backgroundColor: Colors.white,
            elevation: null,
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 0.1,
          },
          headerLeft: () => (
            <View style={styles.logo}>
              <Image
                style={{ width: responsiveHeight(30) }}
                source={require("../assets/images/AppBarLogo.png")}
                resizeMode="contain"
              />
            </View>
          ),
          headerRight: () => (
            <NotificationBell
              onPress={() => {
                navigation.navigate("Notifications");
              }}
            />
          ),
          tabBarStyle: {
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 0,
            borderTopWidth: 0.7,
            borderTopColor: Colors.black,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
  
            elevation: 7,
          },
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: Colors.extralightgrey,
        })}
      >
        <BottomTabs.Screen name="PastDoubts" component={PastDoubts} />
        <BottomTabs.Screen name="Community" component={Community} />
        <BottomTabs.Screen name="HomeScreen" component={HomeScreen} />
        <BottomTabs.Screen name="ActiveDoubts" component={ActiveDoubts}  options={{tabBarIcon: ({size}) => <Icons name='comments' size={responsiveFontSize(3.5)} color={Colors.blue}/>}} />
        <BottomTabs.Screen name="Profile" component={Profile} />
      </BottomTabs.Navigator>
    );
  }
  export default function NavigationBar() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"LoginScreen"}
          screenOptions={({}) => ({
            headerStyle: {
              backgroundColor: Colors.blue,
              borderBottomWidth: 1,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
  
              elevation: 5,
            },
            headerTitleStyle: {
              fontSize: responsiveFontSize(2.3),
              color: Colors.white,
            },
            headerTitleAlign: "center",
            headerTintColor: Colors.white,
          })}
        >
          <Stack.Screen
            name="Overview"
            component={Overview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyEmail"
            component={VerifyEmail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AlumniProfile"
            component={AlumniProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SuccessPage"
            component={SuccessPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StudentProfile"
            component={StudentProfile}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="CreateDoubtScreen"
            component={CreateDoubtScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FacultyList"
            component={FacultyList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FrequentlyAskedQuestion"
            component={FrequentlyAskedQuestion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NoInternet"
            component={NoInternet}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SocailMediaScreen"
            component={SocailMediaScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReenterPassword"
            component={ReenterPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewDetails"
            component={ViewDetails}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ReportStudent"
            component={ReportStudent}
            options={{ headerShown: true }}
          />
          <Stack.Screen name="Notifications" component={Notification} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    logo: { paddingLeft: 16 },
    bellBox: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
  });
  