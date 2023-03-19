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
import NotificationBell from "../components/NotificationBell";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const Home = "Home";
const Analytics = "Analytics";
const Announcement = "Announcement";
const Profile = "Profile";

function Overview() {
  const auth = getAuth();
  const useruid = auth.currentUser.uid;
  const db = getFirestore(app);
  const getUserData = async () => {
    const a = await getDoc(doc(db, "faculty", useruid));
    AsyncStorage.setItem("users", JSON.stringify(a.data()));
  };

  useEffect(() => {
    async function fetchData() {
      await AsyncStorage.removeItem("users");
      let user = await AsyncStorage.getItem("users");
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
          } else if (rn === Analytics) {
            iconName = "chart-line";
          } else if (rn === Announcement) {
            iconName = "scroll";
          } else if (rn === Profile) {
            iconName = "user-alt";
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
      <BottomTabs.Screen name="Home" component={Routes.home} />
      <BottomTabs.Screen name="Analytics" component={Routes.analytics} />
      <BottomTabs.Screen name="Announcement" component={Routes.announcement} />
      <BottomTabs.Screen name="Profile" component={Routes.profile} />
    </BottomTabs.Navigator>
  );
}
export default function NavigationBar() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Splash"}
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
          headerTintColor: Colors.white,
        })}
      >
        <Stack.Screen
          name="Overview"
          component={Overview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Splash"
          component={Routes.splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={Routes.loginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={Routes.forgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyEmail"
          component={Routes.verifyEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPasswordLinkSend"
          component={Routes.resetPasswordLinkSend}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Notifications" component={Routes.notification} />
        <Stack.Screen name="Total Doubts" component={Routes.totaldoubts} />
        <Stack.Screen name="On a Break" component={Routes.onLeave} />
        <Stack.Screen
          name="Total Announcements"
          component={Routes.totalannouncements}
        />
        <Stack.Screen
          name="AnswerDoubt"
          component={Routes.answerdoubt}
          options={{
            presentation: "containedTransparentModal",
            headerShown: false,
          }}
        />
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
