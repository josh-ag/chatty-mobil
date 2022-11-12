import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './navigators/authStack';
import {AppStack} from './navigators/stack';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, ToastAndroid, Text} from 'react-native';
import {bgPrimary, bgSecondary, lightDark} from './utils/colors';
import NetInfo from '@react-native-community/netinfo';
import {Authenticate} from './feature/reducers/authReducer';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const Main = () => {
  const {isAuthenticated, isLoading} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  //subscribe to network state
  const unsubscribe = NetInfo.addEventListener(state => {
    // console.log('Is Internet Reachable: ', state.isInternetReachable);
    // console.log('Connection Type: ', state.type);
    // console.log('Is Connected: ', state.isConnected);

    if (!state.isInternetReachable) {
      ToastAndroid.show(
        'Turn On Cellular Network or connect to wifi',
        ToastAndroid.SHORT,
      );
    }
  });
  unsubscribe();

  useEffect(() => {
    dispatch(Authenticate());
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: bgSecondary,
        }}>
        <ActivityIndicator color={bgPrimary} />
        <Text
          style={{
            fontFamily: 'Outfit-Light',
            textAlign: 'center',
            marginTop: 16,
            color: lightDark,
          }}>
          Please wait....
        </Text>
      </Animated.View>
    );
  }
  if (!isAuthenticated) {
    return <AuthStack />;
  } else {
    return <AppStack />;
  }
};

const App = () => (
  <NavigationContainer>
    <Main />
  </NavigationContainer>
);

export default App;
