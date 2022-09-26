import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {deviceTypeAndroid} from '../utils/platforms';
import {bgLight, bgPrimary, bgSecondary, Size} from '../utils/colors';
import Animated, {
  SlideInUp,
  SlideInLeft,
  SlideOutUp,
  SlideOutRight,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SuccessComponent = ({
  message,
  isSuccess = !!message,
  setSuccess,
}) => {
  const [loading, setLoading] = useState(true);
  const {width, height} = useWindowDimensions();

  //dismiss log @3s
  setTimeout(() => setSuccess(false), 3000);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={isSuccess ? bgSecondary : bgLight}
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
              backgroundColor: bgSecondary,
              paddingTop: 10,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 9,
              elevation: 1,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', right: 50, top: 20, zIndex: 10}}
              onPress={() => setSuccess(false)}>
              <Ionicons
                name="close"
                color={bgPrimary}
                size={deviceTypeAndroid === 'Handset' ? Size / 1.2 : Size / 1.2}
              />
            </TouchableOpacity>
            <Animated.View
              entering={SlideInLeft}
              exiting={SlideOutRight}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <ActivityIndicator
                size="small"
                color={bgPrimary}
                animating={loading}
              />
              <Animated.Text
                style={{
                  fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
                  fontFamily: 'Outfit-Medium',
                  color: bgPrimary,
                  textAlign: 'center',
                  marginLeft: 5,
                  color: bgPrimary,
                }}>
                {message}
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
};
