import { AuthData } from "../context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function signIn(email: string, password: string): Promise<AuthData> {


  return new Promise(async (resolve, reject) => {

    
    setTimeout(async () => {

      try {
      const authData = await AsyncStorage.getItem('@AuthUser');
      const authDataStorage = authData ? JSON.parse(authData) as AuthData : undefined;

      if (email === authDataStorage?.email && password === authDataStorage.password) {
        resolve(authDataStorage);
      } else {
        reject(new Error("Credenciais Inválidas"));
      }
      } catch (error) {
        reject(new Error("Credenciais Inválidas"));
      }
      
    }, 500);
  });
}

async function register(
  email: string,
  password: string,
  name: string
): Promise<AuthData> {

  return new Promise((resolve, reject) => {

    

    setTimeout(() => {
      if (email && password && name) {
        resolve({
          email,
          name,
          password,
        });
      } else {
        reject(new Error("Crendeciais Inválidas"));
      }
    });
  });
}

export const authService = { signIn, register };
