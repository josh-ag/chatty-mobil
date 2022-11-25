import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppIntro} from '../screens/appIntro';
import {RegistrationScreen} from '../screens/registrationScreen';
import {LoginScreen} from '../screens/loginScreen';
import {SignUpScreen} from '../screens/signUp';
import {PasswordResetScreen} from '../screens/passwordReset';
import {SuccessConfirmationScreen} from '../screens/successConfirmation';
import {VerifyScreen} from '../screens/verify';
import {NewPasswordScreen} from '../screens/newPassword';

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      animationTypeForReplace: 'push',
    }}>
    <Stack.Screen name="AppIntro" component={AppIntro} />
    <Stack.Screen name="Register" component={RegistrationScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
    <Stack.Screen
      name="ConfirmationSuccess"
      component={SuccessConfirmationScreen}
    />
    <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
    <Stack.Screen name="Verify" component={VerifyScreen} />
  </Stack.Navigator>
);
