import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {SlideInUp, SlideOutUp} from 'react-native-reanimated';
import {bgLight, colorGoogle, Size} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ErrorComponent = ({message, isError = !!message, setError}) => {
  const {width, height} = useWindowDimensions();
  //dismiss log @3s
  // useMemo(() => setTimeout(() => setError(false), 3000), [setError]);

  return (
    <Animated.View
      entering={SlideInUp}
      exiting={SlideOutUp}
      style={{
        height: 120,
        width,
        backgroundColor: colorGoogle,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 16,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 201,
      }}>
      <TouchableOpacity
        style={{position: 'absolute', right: 50, top: 20}}
        onPresponses={() => setError(null)}>
        <Ionicons
          name="close"
          color={bgLight}
          size={deviceTypeAndroid === 'Handset' ? Size / 1.2 : Size / 1.2}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
          fontFamily: 'Outfit-Medium',
          color: bgLight,
          textAlign: 'center',
        }}>
        <Ionicons
          name="alert-circle"
          size={deviceTypeAndroid === 'Handset' ? Size / 1.8 : Size / 1.2}
          color={bgLight}
        />{' '}
        {message.toUpperCase()}
      </Text>
    </Animated.View>
  );
};
