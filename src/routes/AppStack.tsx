import React from 'react'
import { SignInScreen } from '../screens/SignIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Register } from '../screens/Register';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='SignIn' component={SignInScreen} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  )
}