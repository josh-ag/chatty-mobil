import React from 'react';
import {
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Categories} from '../components/categories';
import chatIcon from '../assets/images/rounded-chat.png';
import {bgLight, bgPrimary, bgSecondary, offset} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import userIcon from '../assets/images/user.png';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {useProfileQuery} from '../feature/services/query';
import {logOut} from '../feature/reducers/authReducer';
import {RenderError} from '../components';

const TrendingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {loginId} = useSelector(state => state.auth);
  const {data, error, isLoading} = useProfileQuery(loginId, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (error && error?.data === 'Unauthorized') {
    dispatch(logOut());
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />

      <Animated.View
        style={{flex: 1, backgroundColor: bgLight}}
        entering={FadeIn}
        exiting={FadeOut}>
        <View
          style={{
            backgroundColor: bgSecondary,
            paddingHorizontal: 16,
            paddingTop: offset,
            paddingBottom: 16,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={chatIcon} resizeMode="contain" />
            <Text
              style={{
                fontSize: deviceTypeAndroid === 'Handset' ? 22 : 35,
                fontFamily: 'Outfit-Bold',
                color: bgPrimary,
                marginLeft: 10,
              }}>
              Chatty
            </Text>
          </View>
          <TouchableOpacity
            style={{width: 40, height: 40}}
            activeOpacity={1}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              source={
                data?.user?.profilePicture
                  ? {uri: data?.user?.profilePicture?.url}
                  : userIcon
              }
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={bgPrimary} />
          </View>
        ) : null}
        <Categories navigation={navigation} />
        {!isLoading && error ? (
          <RenderError
            error={
              error?.data?.message ||
              error?.message ||
              error?.error.split(':')[1]
            }
          />
        ) : null}
      </Animated.View>
    </>
  );
};

export default TrendingScreen;
