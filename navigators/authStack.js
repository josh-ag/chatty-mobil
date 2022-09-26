import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppIntro} from '../screens/appIntro';
import {RegistrationScreen} from '../screens/registrationScreen';
import {LoginScreen} from '../screens/loginScreen';
import {SignUpScreen} from '../screens/signUp';
import {PasswordResetScreen} from '../screens/passwordReset';
import {SuccessConfirmation} from '../screens/successConfirmation';

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="AppIntro" component={AppIntro} />
    <Stack.Screen name="Register" component={RegistrationScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
    <Stack.Screen name="Confirmed" component={SuccessConfirmation} />
  </Stack.Navigator>
);
