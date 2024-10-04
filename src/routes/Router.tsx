import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { useAuth } from "../context/Auth";

export function Router() {

  const {authData} = useAuth()

  return (
    <NavigationContainer>
      {authData ? <AuthStack/> : <AppStack/>}
    </NavigationContainer>
  );
}
