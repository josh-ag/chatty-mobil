import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  bgLight,
  textDark,
  lightDark,
  bgPrimary,
  colorFb,
  colorGoogle,
  Size,
  offset,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {deviceTypeAndroid} from '../utils/platforms';
import {MyAppText} from '../components';

export const RegistrationScreen = ({navigation}) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.contentsContainer,
            {paddingTop: offset},
          ]}>
          <View style={[styles.logoContainer]}>
            <Image
              source={require('../assets/images/rounded-chat.png')}
              style={styles.logo}
            />
            <MyAppText style={styles.logoText}>Chatty</MyAppText>
          </View>
          <View>
            <Image
              source={require('../assets/images/connect_world.png')}
              style={styles.bannerImage}
            />
          </View>
          <View style={{marginBottom: 40}}>
            <MyAppText style={styles.pageTitle}>Chatty!</MyAppText>
            <MyAppText style={styles.description}>
              Build Connection to your world
            </MyAppText>
          </View>

          <View style={styles.form}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Login')}
              style={styles.Button}>
              <Text
                style={{
                  color: bgLight,
                  fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
                  fontFamily:
                    deviceTypeAndroid === 'Handset'
                      ? 'Outfit-Medium'
                      : 'Outfit-Bold',
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Signup')}
              style={{
                ...styles.Button,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: textDark,
              }}>
              <Text
                style={{
                  color: lightDark,
                  fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
                  fontFamily:
                    deviceTypeAndroid === 'Handset'
                      ? 'Outfit-Medium'
                      : 'Outfit-Bold',
                }}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.socialTitle}>Or via social media</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity>
              <MaterialIcons
                name="facebook"
                color={colorFb}
                size={deviceTypeAndroid === 'Handset' ? Size * 1.4 : Size * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.socialIcon}>
              <Ionicons
                name="logo-google"
                color={bgLight}
                size={deviceTypeAndroid === 'Handset' ? Size - 5 : Size}
                style={{borderRadius: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{...styles.socialIcon, backgroundColor: bgPrimary}}>
              <FontAwesome5
                name="linkedin-in"
                color={bgLight}
                size={deviceTypeAndroid === 'Handset' ? Size - 5 : Size}
                style={{borderRadius: 50}}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  contentsContainer: {
    backgroundColor: bgLight,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  logo: {
    width: deviceTypeAndroid === 'Handset' ? 40 : 60,
    height: deviceTypeAndroid === 'Handset' ? 40 : 60,
  },
  logoText: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    marginLeft: 8,
    color: textDark,
  },
  bannerImage: {
    width: '100%',
    height: deviceTypeAndroid === 'Handset' ? 300 : 600,
    resizeMode: 'contain',
    marginTop: 20,
    alignSelf: 'center',
  },

  pageTitle: {
    textAlign: 'center',
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    color: textDark,
    marginBottom: 5,
  },
  description: {
    textAlign: 'center',
    color: lightDark,
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit-Medium',
  },
  form: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 40,
    color: lightDark,
    marginBottom: 10,
  },
  Button: {
    backgroundColor: bgPrimary,
    width: deviceTypeAndroid === 'Handset' ? 100 : 150,
    height: deviceTypeAndroid === 'Handset' ? 50 : 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  socialIcon: {
    width: deviceTypeAndroid === 'Handset' ? 36 : 45,
    height: deviceTypeAndroid === 'Handset' ? 36 : 45,
    borderRadius: 50,
    backgroundColor: colorGoogle,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginRight: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
