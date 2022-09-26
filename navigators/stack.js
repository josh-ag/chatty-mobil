import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTab} from './bottomTab';

import {DiscussionDetails} from '../screens/discussionDetails';
import {ProfileScreen} from '../screens/profile';

const Stack = createNativeStackNavigator();

export const AppStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Trends" component={MainTab} />
    <Stack.Screen name="Discussion" component={DiscussionDetails} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);
