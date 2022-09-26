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
import {bgLight, bgPrimary, lightDark, Size} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deviceTypeAndroid} from '../utils/platforms';

export const SuccessConfirmation = ({navigation, route}) => (
  <ImageBackground
    source={require('../assets/images/bgSecurity.jpg')}
    style={{flex: 1, width: '100%', resizeMode: 'cover'}}>
    <StatusBar
      barStyle="dark-content"
      translucent
      backgroundColor={'transparent'}
    />
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        style={{
          marginTop: 63,
          marginLeft: 40,
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={navigation.goBack}>
        <Ionicons name="chevron-back" color={bgPrimary} size={Size} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Image
          source={require('../assets/images/mailSent.png')}
          style={styles.imageBanner}
        />
        <Text style={styles.title}>Instructions Sent</Text>
        <Text style={styles.description}>{route.params.message}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ImageBackground>
);

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
    marginBottom: 40,
  },
  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    color: bgPrimary,
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
    borderRadius: 50,
    backgroundColor: bgPrimary,
    marginTop: 40,
  },
  buttonText: {
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    color: bgLight,
    textAlign: 'center',
  },
});
