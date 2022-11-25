import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  bgLight,
  lightDark,
  bgPrimary,
  colorGoogle,
  Size,
  colorDisabled,
  offset,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {deviceTypeAndroid} from '../utils/platforms';
import {useLoginMutation} from '../feature/services/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Authenticate} from '../feature/reducers/authReducer';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {RenderError, RenderSuccess} from '../components';

//LOGIN SCREEN
export const LoginScreen = ({navigation}) => {
  /*
  ********************************
  //Internal State
  ********************************
  */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = async () => {
    //reset error/loading state
    setIsLoading(true);
    setError(false);

    try {
      if (!email || !password) {
        setIsLoading(false);
        setError('Some Field Is Empty');
        return;
      }
      if (email && !emailPattern.test(email)) {
        setIsLoading(false);
        setError('Invalid email address');
        return;
      }

      const loginData = {email, password};
      let {data, error} = await login(loginData);

      if (error) {
        // console.log(error);
        setIsLoading(false);
        setError(error?.data?.message || error?.error.split(':')[1]);
      } else {
        setSuccess(data?.message);
        await AsyncStorage.setItem('@auth_token', data?.token);
        await AsyncStorage.setItem('@loginId', data?.id);

        setTimeout(() => dispatch(Authenticate()), 1000);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      // console.log('Error: ', err);
    }
  };

  const iconName = visible ? 'eye-off' : 'eye';

  //clear Error @4mins
  if (error) {
    setTimeout(() => setError(false), 4000);
  }

  return (
    <>
      <StatusBar
        showHideTransition={'slide'}
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        {error && <RenderError error={error} />}
        {success && <RenderSuccess success={success} />}
        <ScrollView
          bounces={false}
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
              alignSelf: 'flex-start',
            }}
            onPress={navigation.goBack}>
            <Ionicons name="chevron-back" color={bgPrimary} size={Size} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Welcome Back!</Text>

          <View
            style={{
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View style={{marginBottom: 20}}>
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
                keyboardType="email-address"
                placeholderTextColor={colorDisabled}
                placeholder="Email"
                style={styles.textInput}
                value={email}
                onChangeText={mail => setEmail(mail)}
              />
            </View>

            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                }}>
                <Ionicons
                  name="key"
                  color={colorDisabled}
                  size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
                />
              </TouchableOpacity>
              <TextInput
                keyboardType="password"
                placeholderTextColor={colorDisabled}
                placeholder="Password"
                style={styles.textInput}
                value={password}
                onChangeText={passwd => setPassword(passwd)}
                secureTextEntry={visible}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                }}
                onPress={() => setVisible(!visible)}>
                <Ionicons
                  name={iconName}
                  color={colorDisabled}
                  size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              disabled={isLoading || false}
              activeOpacity={1}
              onPress={handleLogin}
              style={[
                styles.btnLogin,
                {
                  backgroundColor: isLoading ? colorDisabled : bgPrimary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Text
                style={[
                  styles.btnLoginText,
                  {color: isLoading ? lightDark : bgLight},
                ]}>
                Sign-In
              </Text>

              {isLoading && (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                  <ActivityIndicator
                    style={{marginLeft: 12}}
                    animating={isLoading || false}
                    color={bgPrimary}
                    hidesWhenStopped={true}
                    size="small"
                  />
                </Animated.View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{alignSelf: 'center'}}
              onPress={() => navigation.navigate('PasswordReset')}>
              <Text style={styles.forgetPasswd}>Forget password?</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.btnSocial, {backgroundColor: bgPrimary}]}>
              <FontAwesome5 name="facebook-f" color={bgLight} size={Size - 8} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={styles.btnSocial}>
              <Ionicons
                name="logo-google"
                color={bgLight}
                size={Size - 8}
                style={{borderRadius: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.btnSocial, {backgroundColor: bgPrimary}]}>
              <FontAwesome5
                name="linkedin-in"
                color={bgLight}
                size={Size - 8}
                style={{borderRadius: 50}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={styles.textInfo}>Don't have account? </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Signup')}>
              <Text
                style={[
                  styles.textInfo,
                  {
                    color: bgPrimary,
                  },
                ]}>
                Sign-Up
              </Text>
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
    width: '100%',
    paddingHorizontal: 16,
  },

  backText: {
    fontFamily: 'Outfit-Light',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: bgPrimary,
  },
  description: {
    fontFamily: 'Outfit-Medium',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: bgPrimary,
  },

  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
    marginTop: 30,
  },

  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colorDisabled,
    marginBottom: 10,
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit-Light',
    color: lightDark,
    paddingLeft: deviceTypeAndroid === 'Handset' ? 40 : 55,
  },

  btnLogin: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 50,
    marginTop: 20,
  },

  btnLoginText: {
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    color: bgLight,
    textAlign: 'center',
  },

  forgetPasswd: {
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
    color: lightDark,
    marginTop: 10,
  },

  btnSocial: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: colorGoogle,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginRight: 10,
  },

  textInfo: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    color: lightDark,
  },
});
