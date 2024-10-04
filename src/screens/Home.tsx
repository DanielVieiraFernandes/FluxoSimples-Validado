import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { MyButton } from "../components/MyButton";
import { useAuth } from "../context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthData } from "../context/Auth";
import { styles } from "./Styles";

export function Home() {
  const [authData, setAuth] = useState<AuthData>();

  const { signOut } = useAuth();

  useEffect(() => {
    async function authStorage() {
      const auth = await AsyncStorage.getItem("@AuthUser");
      if (auth) {
        setAuth(JSON.parse(auth) as AuthData);
      }
      return auth;
    }

    authStorage();
  }, []);

  return (
    <View style={styles.containerHome}>
      <View style={styles.userContainer}>
        <Text style={{fontSize: 20}}>Usuário: {authData?.name}</Text>
        <Text style={{fontSize: 20}}>Email: {authData?.email}</Text>
      </View>
      <View style={styles.bttContainer}>
      <MyButton title="Logout" onPress={() => signOut()} titleColor={undefined} style={{width: 100, height: 60, alignItems: 'center'}} />
      </View>
    </View>
  );
}
