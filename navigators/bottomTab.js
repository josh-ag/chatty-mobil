import React from 'react';
import {View, Platform, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SettingsScreen} from '../screens/settingsScreen';
import TrendingScreen from '../screens/trendingScreen';
import {SearchScreen} from '../screens/searchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {bgPrimary, lightDark, Size} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';

const Tab = createBottomTabNavigator();

const TabIconComponent = ({focused, route, color}) => {
  //chose icon by platform
  const iconName = Platform.select({
    ios:
      route.name === 'Settings'
        ? 'ellipsis-vertical'
        : route.name === 'Search'
        ? 'search'
        : null,
    android:
      route.name === 'Settings'
        ? 'ellipsis-horizontal'
        : route.name === 'Search'
        ? 'search'
        : null,
    default:
      route.name === 'Settings'
        ? 'ellipsis-horizontal'
        : route.name === 'Search'
        ? 'search'
        : null,
  });

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {route.name === 'Trending' ? (
        <MaterialIcons
          name="tag"
          color={focused.focused ? color : lightDark}
          size={focused.focused ? Size : Size - 3}
        />
      ) : (
        <Ionicons
          name={iconName}
          color={focused.focused ? color : lightDark}
          size={focused.focused ? Size : Size - 3}
        />
      )}

      {focused.focused && (
        <Text
          style={{
            fontFamily: 'Outfit-Medium',
            fontSize: 16,
            color: focused.focused ? color : lightDark,
            width: '100%',
          }}>
          {route.name}
        </Text>
      )}
    </View>
  );
};

export const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: bgPrimary,
        tabBarInactiveTintColor: lightDark,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: deviceTypeAndroid === 'Handset' ? 63 : 100,
          border: 0,
          elevation: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarIcon: (focused, color = bgPrimary, size) => (
          <TabIconComponent
            focused={focused}
            color={color}
            size={size}
            route={route}
          />
        ),
      })}
      activeColor={bgPrimary}>
      <Tab.Screen name="Trending" component={TrendingScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
