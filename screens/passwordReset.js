import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {ErrorComponent} from '../components/errors';

import {
  bgLight,
  lightDark,
  colorDisabled,
  bgPrimary,
  Size,
  bgSecondary,
} from '../utils/colors';
import {initPasswordReset} from '../utils/operations';
import {deviceTypeAndroid} from '../utils/platforms';

export const PasswordResetScreen = ({navigation}) => {
  /*
    *********************************
    RESET PASSWORD STATE
    *********************************
    */
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSendInstructions = async () => {
    setIsLoading(true);

    if (!resetEmail) {
      setIsLoading(false);
      return setError('Missing parameter');
    }

    if (!emailPattern.test(resetEmail)) {
      setIsLoading(false);
      return setError('Invalid email address');
    }

    try {
      const response = await initPasswordReset(resetEmail);

      if (response.statusCode === 400) {
        setIsLoading(false);
        return setError(response.message.error);
      }

      if (response.statusCode === 200) {
        setIsLoading(false);
        navigation.navigate('Confirmed', {message: response.message.success});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const {width} = Dimensions.get('window');
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <ImageBackground
        source={require('../assets/images/bgSecurity.jpg')}
        style={{
          flex: 1,
          resizeMode: 'cover',
          width: '100%',
          height: '100%',
        }}>
        <SafeAreaView style={{flex: 1}}>
          {error && <ErrorComponent message={error} setError={setError} />}
          {isLoading && (
            <View
              style={{
                position: 'absolute',
                top: 20,
                justifyContent: 'center',
                width: '100%',
                zIndex: 100,
                backgroundColor: bgSecondary,
                width: 25,
                height: 25,
                borderRadius: 50,
                right: width / 2,
              }}>
              <ActivityIndicator
                animating={isLoading || false}
                color={bgPrimary}
                hidesWhenStopped={true}
                size="small"
              />
            </View>
          )}
          <ScrollView
            contentContainerStyle={styles.contentsContainer}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={navigation.goBack}>
              <Ionicons name="chevron-back" color={bgPrimary} size={Size} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.description}>
              Enter the email associated with your account and we'll send email
              with reset instructions to reset your password.
            </Text>

            <View style={{marginTop: 40}}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                }}>
                <Ionicons
                  name="at"
                  color={colorDisabled}
                  size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
                />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={colorDisabled}
                placeholder="Email"
                style={styles.textInput}
                defaultValue={resetEmail}
                onChangeText={mail => setResetEmail(mail)}
              />
            </View>

            <TouchableOpacity
              onPress={handleSendInstructions}
              style={styles.btnLogin}>
              <Text style={styles.btnLoginText}>Send Instruction</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  contentsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: 60,
  },

  backText: {
    fontFamily: 'Outfit-Medium',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: bgPrimary,
  },

  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: lightDark,
    marginTop: 10,
    fontFamily: 'Outfit',
  },

  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    color: lightDark,
    fontFamily: 'Outfit-Bold',
    marginTop: 40,
  },

  textInput: {
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: colorDisabled,
    marginBottom: 10,
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
    paddingLeft: deviceTypeAndroid === 'Handset' ? 40 : 55,
  },

  btnLogin: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 50,
    backgroundColor: bgPrimary,
    marginTop: 20,
  },

  btnLoginText: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    color: bgLight,
    textAlign: 'center',
  },
});
