// import React from 'react';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

//get androidDeviceType
export const deviceTypeAndroid =
  Platform.OS === 'android' && DeviceInfo.getDeviceType();
