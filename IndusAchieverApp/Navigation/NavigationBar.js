import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
  import { StyleSheet, Text, View, Image } from "react-native";
  import { NavigationContainer } from "@react-navigation/native";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import {FontAwesome5} from "@expo/vector-icons";
  import { FontAwesome } from '@expo/vector-icons';
  import Icons from "react-native-vector-icons/FontAwesome";
  import * as React from "react";
  import Routes from "./Routes";
  import Colors from "../constants/Colors";
  import NotificationBell from "../components/NotificationBell";
  
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  
  const Home = "Home";
  const PastDoubts = "PastDoubts";
  const Community = "Community";
  const ActiveDoubts = "ActiveDoubts";
  const Profile = "Profile";
  
  function Overview() {
    return (
      <BottomTabs.Navigator
        initialRouteName={Home}
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: () => {
            let iconName;
            let rn = route.name;
            if (rn === Home) {
              iconName = "home";
            } else if (rn === PastDoubts) {
              iconName = "clipboard-list";
            } else if (rn === Community) {
              iconName = "users";
            } else if (rn === Profile) {
              iconName = "user-alt";
            } else if (rn === ActiveDoubts) {
              // iconName = "folder-minus"
              iconName = "leanpub"
            }
            return (
              <FontAwesome5
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
        <BottomTabs.Screen name="PastDoubts" component={Routes.pastDoubts} />
        <BottomTabs.Screen name="Community" component={Routes.community} /> 
        <BottomTabs.Screen name="Home" component={Routes.homeScreen} />
        <BottomTabs.Screen name="ActiveDoubts" component={Routes.activeDoubts} />
        <BottomTabs.Screen name="Profile" component={Routes.profile} />
      </BottomTabs.Navigator>
    );
  }
  export default function NavigationBar() {
    return (
      <NavigationContainer>
        <Stack.Navigator
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
          <Stack.Screen name="Notifications" component={Routes.notification} />
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