import { responsiveFontSize } from "react-native-responsive-dimensions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import Routes from "./Routes";
import Colors from "../constants/Colors";
const Auth = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Auth.Navigator
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
        headerTitleAlign: "center",
        headerTintColor: Colors.white,
      })}
    >
      <Auth.Screen
        name="Splash"
        component={Routes.splash}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="LoginScreen"
        component={Routes.loginScreen}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="ForgotPassword"
        component={Routes.forgotPassword}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="VerifyEmail"
        component={Routes.verifyEmail}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="ResetPasswordLinkSend"
        component={Routes.resetPasswordLinkSend}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
}
