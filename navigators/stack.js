import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTab} from './bottomTab';

import {DiscussionDetails} from '../screens/discussionDetails';
import {ProfileScreen} from '../screens/profile';
import {MessageScreen} from '../screens/messages';

const Stack = createNativeStackNavigator();

export const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      animationTypeForReplace: 'push',
    }}>
    <Stack.Screen name="Trends" component={MainTab} />
    <Stack.Screen name="Discussion" component={DiscussionDetails} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen
      name="Messages"
      component={MessageScreen}
      options={{
        headerShown: false,
        animation: 'slide_from_bottom',
        presentation: 'fullScreenModal',
      }}
    />
  </Stack.Navigator>
);
