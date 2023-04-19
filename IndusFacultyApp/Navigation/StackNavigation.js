import { responsiveFontSize } from "react-native-responsive-dimensions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Routes from "./Routes";
import Colors from "../constants/Colors";
import ClientTabs from "./ClientTabs";
const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={"Overview"}
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
        component={ClientTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Announcements" component={Routes.notification} />

      <Stack.Screen name="Total Doubts" component={Routes.totalDoubts} />
      <Stack.Screen name="On a Break" component={Routes.onLeave} />
      <Stack.Screen
        name="Total Announcements"
        component={Routes.totalAnnouncements}
      />

      <Stack.Screen
        name="Answer Doubt"
        component={Routes.answerDoubt}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Report Student"
        component={Routes.reportStudent}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Event Details"
        component={Routes.viewDetails}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
