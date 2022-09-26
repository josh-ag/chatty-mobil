import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  SlideInUp,
  SlideInLeft,
  SlideOutUp,
  SlideOutRight,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';
import {bgLight, colorGoogle, Size} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ErrorComponent = ({message, isError = !!message, setError}) => {
  const {width, height} = useWindowDimensions();

  //clear error state @3s
  setTimeout(() => setError(false), 3000);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={isError ? colorGoogle : bgLight}
        translucent={false}
      />
      <SafeAreaView>
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutDown}
          style={{
            width,
            height,
            backgroundColor: 'rgba(227, 242, 253,.3)',
            paddingTop: 10,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}>
          <Animated.View
            entering={SlideInUp}
            exiting={SlideOutUp}
            style={{
              height: 60,
              width,
              backgroundColor: colorGoogle,
              paddingTop: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              top: 0,
              left: 0,
              zIndex: 101,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', right: 50, top: 5, zIndex: 10}}
              onPress={() => setError(false)}>
              <Ionicons
                name="close"
                color={bgLight}
                size={deviceTypeAndroid === 'Handset' ? Size / 1.2 : Size / 1.2}
              />
            </TouchableOpacity>
            <Animated.Text
              entering={SlideInLeft}
              exiting={SlideOutRight}
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
              {message}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
};
