import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SignInContext } from "../context/AuthContext";
import StackNavigation from "./StackNavigation";
import AuthStack from "./AuthStack";
export default function RootNavigator() {
  const { signedIn } = useContext(SignInContext);

  return (
    <NavigationContainer>
      {signedIn.userToken === null ? <AuthStack /> : <StackNavigation />}
    </NavigationContainer>
  );
}
