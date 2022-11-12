import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {
  bgLight,
  lightDark,
  colorDisabled,
  bgPrimary,
  Size,
  bgSecondary,
  colorGoogle,
  offset,
} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import {useResetPasswordMutation} from '../feature/services/query';

export const PasswordResetScreen = ({navigation}) => {
  /*
    *********************************
    RESET PASSWORD STATE
    *********************************
    */
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword] = useResetPasswordMutation();

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
      const {data, error} = await resetPassword({email: resetEmail});

      if (error) {
        console.log('Error: ', error);
        setIsLoading(false);
        return setError(error.data.message || error?.error || error?.message);
      }

      if (data) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const {width} = Dimensions.get('window');

  const RenderError = () => (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 100,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorGoogle,
      }}>
      <Text style={{color: bgLight, fontFamily: 'Outfit-Light', fontSize: 18}}>
        {error}
      </Text>
    </Animated.View>
  );

  const RenderSuccess = () => (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 100,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorGoogle,
      }}>
      <Text style={{color: bgLight, fontFamily: 'Outfit-Light', fontSize: 18}}>
        {success}
      </Text>
    </Animated.View>
  );

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/images/bgSecurity.jpg')}
          style={{
            flex: 1,
            resizeMode: 'contain',
            width: '100%',
            height: '100%',
          }}>
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
          {error && <RenderError />}
          <ScrollView
            contentContainerStyle={[
              styles.contentsContainer,
              {paddingTop: offset},
            ]}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
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
                activeOpacity={1}
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
              activeOpacity={1}
              onPress={handleSendInstructions}
              style={styles.btnLogin}>
              <Text style={styles.btnLoginText}>Send Instruction</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  contentsContainer: {
    paddingHorizontal: 16,
    position: 'relative',
    zIndex: 2,
  },

  backText: {
    fontFamily: 'Outfit-Light',
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
    fontFamily: 'Outfit-Medium',
    marginTop: 30,
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
