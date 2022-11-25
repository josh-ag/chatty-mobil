import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import {bgLight, bgPrimary, lightDark} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import {useSelector} from 'react-redux';

export const SuccessConfirmationScreen = ({navigation, route}) => {
  const {isAuthenticated} = useSelector(state => state.auth);
  return (
    <ImageBackground
      source={require('../assets/images/bgSecurity.jpg')}
      style={{flex: 1, width: '100%', resizeMode: 'cover'}}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Image
            source={require('../assets/images/mailSent.png')}
            style={styles.imageBanner}
          />
          <Text style={styles.title} allowFontScaling={false}>
            Congratulations Your account has been verified
          </Text>

          {isAuthenticated ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Trends')}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>SignIn</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  backText: {
    fontFamily: 'Outfit-Medium',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: bgPrimary,
  },
  imageBanner: {
    width: '100%',
    height: deviceTypeAndroid === 'Handset' ? 200 : 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    color: bgPrimary,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    fontWeight: '400',
    color: lightDark,
    marginTop: 10,
    fontFamily: 'Outfit',
    textAlign: 'center',
    width: '80%',
  },
  button: {
    alignSelf: 'center',
    padding: 15,
    width: '80%',
    borderRadius: 20,
    backgroundColor: bgPrimary,
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    color: bgLight,
    textAlign: 'center',
  },
});
