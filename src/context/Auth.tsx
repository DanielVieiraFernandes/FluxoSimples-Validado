import React, { useContext, createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { authService } from "../services/authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthData {
  email: string;
  name: string;
  password: string;
}

interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string) => Promise<AuthData>;
  signOut: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<AuthData>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuth] = useState<AuthData>();

  useEffect(() => {
    loadFromStorage();
  }, [])

  async function loadFromStorage() {
    const auth = await AsyncStorage.getItem('@AuthUser');
    if(auth) {
      setAuth(JSON.parse(auth) as AuthData)
    }
  }

  async function register(email: string, password: string, name: string): Promise<AuthData> {

    try {
      
      const auth = await authService.register(email, password, name);
      setAuth(auth);

      await AsyncStorage.setItem('@AuthUser', JSON.stringify(auth));
      
     return auth;
      
    } catch (error) {
      Alert.alert(error.message, "digite os dados corretamente");
      throw error;
    }
    
  }

  async function signIn(email: string, password: string): Promise<AuthData> {
    try {
      const auth = await authService.signIn(email, password);
      setAuth(auth);

      return auth;
    } catch (error) {
      Alert.alert(error.message, "tente novamente");
      throw error;
    }
  }

  function signOut(): Promise<void> {
    setAuth(undefined);
    return Promise.resolve();
  }

  return (
    <AuthContext.Provider value={{ authData, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}