import React, {useRef} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Animated,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Categories} from '../components/categories';
import chatIcon from '../assets/images/rounded-chat.png';
import {bgLight, bgPrimary, bgSecondary, Size} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const TrendingScreen = () => {
  const navigation = useNavigation();

  //toggle appbar on-scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, 120);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -120],
  });

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        <View>
          <Animated.View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 120,
              position: 'absolute',
              backgroundColor: bgSecondary,
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              paddingHorizontal: 16,
              paddingVertical: 16,
              transform: [{translateY}],
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
              activeOpacity={1}
              onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="person" size={Size} color={bgPrimary} />
            </TouchableOpacity>
          </Animated.View>

          <Categories navigation={navigation} scrollY={scrollY} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default TrendingScreen;
