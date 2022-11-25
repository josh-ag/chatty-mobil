import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {bgLight, bgPrimary, Size} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import {MyAppText} from '../components';

const Slides = [
  {
    key: 'welcome',
    title: 'welcome, Chatty!',
    text: 'A next-gen chat application. Click Next to begin',
    image: require('../assets/images/welcome.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'vr',
    title: 'Metaverse',
    text: 'Join the discussion and learn then nuances of Virtual Reality',
    image: require('../assets/images/Virtual_reality.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'ai',
    title: 'Artificial Intelligence',
    text: 'What do people say about mankind greatest invention. Join the community to learn more',
    image: require('../assets/images/Firmware.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'photography',
    title: 'Arial Photography',
    text: 'Get the chance to meet other professional and learn the de factor in Arial Photography.',
    image: require('../assets/images/Camera.png'),
    backgroundColor: bgPrimary,
  },
  {
    key: 'climate',
    title: 'Climate Change',
    text: 'With the recent rise in sea level and expotential temperature rise. What are scientists and folks saying about climate change',
    image: require('../assets/images/among_nature.png'),
    backgroundColor: bgPrimary,
  },
];

export const AppIntro = ({navigation}) => {
  const renderItems = ({item}) => (
    <Animated.View
      style={[
        styles.slideContainer,
        {
          backgroundColor: item.backgroundColor,
        },
      ]}>
      <MyAppText style={styles.title}>{item.title}</MyAppText>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <MyAppText style={styles.text}>{item.text}</MyAppText>
      </View>
    </Animated.View>
  );

  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('Register')}
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 100,
          padding: 5,
          marginRight: 25,
        }}>
        <Ionicons name="checkmark" size={Size} color={bgLight} />
        <MyAppText
          style={{
            fontSize: 18,
            fontFamily: 'Outfit-Bold',
            color: '#fff',
            fontWeight: '700',
          }}>
          Done
        </MyAppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="light-contents"
        backgroundColor={'transparent'}
        translucent
      />
      <AppIntroSlider
        renderItem={renderItems}
        data={Slides}
        renderDoneButton={renderDoneButton}
        showNextButton={true}
        showSkipButton={true}
        showPrevButton={true}
        activeDotStyle={{
          borderWidth: 6,
          borderRadius: 20,
          borderColor: bgLight,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
    color: '#fff',
    textTransform: 'capitalize',
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  image: {
    height: deviceTypeAndroid === 'Handset' ? '40%' : '50%',
    width: deviceTypeAndroid === 'Handset' ? '90%' : '80%',
    alignSelf: 'center',
    borderRadius: 15,
    resizeMode: 'contain',
  },
  textContainer: {
    width: deviceTypeAndroid === 'Handset' ? '90%' : '80%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  text: {
    fontSize: deviceTypeAndroid === 'Handset' ? 16 : 24,
    color: bgLight,
    fontFamily: 'Outfit-Medium',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 24,
  },
});
