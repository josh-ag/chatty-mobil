import {Platform, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const androidType = DeviceInfo.getDeviceType();

export const globalStyles = StyleSheet.create(() =>
  Platform.select({
    /*
    *
    //Ios Style
    *
    */
    ios: {
      containerContents: {width: '200'},
    },

    /*
    *
    //Android Style
    *
    */
    android: {
      containerContents: {
        width: '100%',
        height: '100%',
      },
    },
    /*
    *
    //Others Style
    *
    */
    default: {
      containerContents: {
        width: '100%',
        height: '100%',
      },
    },
  }),
);
