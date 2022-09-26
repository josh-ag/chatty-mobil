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
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {
  bgLight,
  lightDark,
  bgPrimary,
  colorGoogle,
  Size,
  colorDisabled,
  bgSecondary,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {SuccessComponent} from '../components/success';
import {deviceTypeAndroid} from '../utils/platforms';
import Animated, {
  SlideInLeft,
  SlideInUp,
  SlideOutUp,
  SlideOutRight,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';
import {loginUser} from '../feature/reducers/appGlobalReducer';

import {useLogin} from '../utils/operations';

export const LoginErrorComponent = ({
  message,
  isError = !!message,
  setError,
}) => {
  const {width, height} = useWindowDimensions();

  //dismiss log @3s
  setTimeout(() => setError(false), 3000);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={isError ? colorGoogle : bgLight}
      />
      <SafeAreaView
        style={{
          flex: 1,
          position: 'absolute',
          zIndex: 100,
        }}>
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutDown}
          style={{
            width,
            height,
            backgroundColor: 'rgba(227, 242, 253,.3)',
            paddingTop: 10,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 101,
          }}>
          <Animated.View
            entering={SlideInUp}
            exiting={SlideOutUp}
            style={{
              height: 63,
              width,
              backgroundColor: colorGoogle,
              paddingTop: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 99,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', right: 50, top: 20}}
              onPresponses={() => setError(null)}>
              <Ionicons
                name="close"
                color={bgLight}
                size={deviceTypeAndroid === 'Handset' ? Size / 1.2 : Size / 1.2}
              />
            </TouchableOpacity>
            <Animated.Text
              entering={SlideInLeft}
              exiting={SlideOutRight}
              style={{
                fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
                fontFamily: 'Outfit-Medium',
                color: bgLight,
                textAlign: 'center',
              }}>
              <Ionicons
                name="alert-circle"
                size={deviceTypeAndroid === 'Handset' ? Size / 1.8 : Size / 1.2}
                color={bgLight}
              />{' '}
              {message}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
};

export const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = async () => {
    //reset error/loading state
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      setError('Missing Parameters');
      return;
    }

    if (email && !emailPattern.test(email)) {
      setIsLoading(false);
      setError('Invalid email address');
      return;
    }

    const response = await useLogin(email, password);

    console.log('Login Response: ', response);

    if (response?.error) {
      setIsLoading(false);
      setError(response.error.message);
      return;
    }

    setIsLoading(false);

    dispatch(
      loginUser({
        isLoggedIn: true,
        id: response.user.id,
        email: response.user.email,
        username: response.user.username,
      }),
    );
  };

  const iconName = visible ? 'eye-off' : 'eye';
  const {width} = useWindowDimensions();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
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
        {error ? (
          <LoginErrorComponent message={error} setError={setError} />
        ) : null}
        {success ? (
          <SuccessComponent message={success} setSuccess={setSuccess} />
        ) : null}

        <ScrollView
          contentContainerStyle={styles.contentsContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
              }}>
              <Ionicons name="chevron-back" color={bgPrimary} size={Size} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Welcome Back!</Text>

          <View
            style={{
              marginTop: 40,
              marginBottom: 20,
            }}>
            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                }}>
                <MaterialIcons
                  name="alternate-email"
                  color={colorDisabled}
                  size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
                />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={colorDisabled}
                placeholder="Username/Email"
                style={styles.textInput}
                defaultValue={email}
                onChangeText={mail => setEmail(mail)}
              />
            </View>

            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                }}>
                <MaterialIcons
                  name="vpn-key"
                  color={colorDisabled}
                  size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
                />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={colorDisabled}
                placeholder="Password"
                style={styles.textInput}
                defaultValue={password}
                onChangeText={passwd => setPassword(passwd)}
                secureTextEntry={visible}
              />
              <TouchableOpacity
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

            <TouchableOpacity onPress={handleLogin} style={styles.btnLogin}>
              <Text style={styles.btnLoginText}>Sign-In</Text>
            </TouchableOpacity>
            <TouchableOpacity
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
              style={[styles.btnSocial, {backgroundColor: bgPrimary}]}>
              <FontAwesome5 name="facebook-f" color={bgLight} size={Size} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSocial}>
              <Ionicons
                name="logo-google"
                color={bgLight}
                size={Size}
                style={{borderRadius: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnSocial, {backgroundColor: bgPrimary}]}>
              <FontAwesome5
                name="linkedin-in"
                color={bgLight}
                size={Size}
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
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text
                style={[
                  styles.textInfo,
                  {
                    fontWeight: 'bold',
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
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },

  logoContainer: {
    flexDirection: 'column',
    marginBottom: 40,
  },
  backText: {
    fontFamily: 'Outfit-Medium',
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
    fontFamily: 'Outfit-Bold',
    color: lightDark,
  },

  textInput: {
    borderBottomWidth: 1,
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
    marginTop: 20,
    backgroundColor: bgPrimary,
  },

  btnLoginText: {
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    color: bgLight,
    textAlign: 'center',
  },

  forgetPasswd: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit-Medium',
    textAlign: 'center',
    color: lightDark,
    marginTop: 10,
  },

  btnSocial: {
    width: deviceTypeAndroid === 'Handset' ? 35 : 50,
    height: deviceTypeAndroid === 'Handset' ? 35 : 50,
    borderRadius: 50,
    backgroundColor: colorGoogle,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginRight: 10,
  },

  textInfo: {
    textAlign: 'center',
    fontSize: deviceTypeAndroid === 'Handset' ? 16 : 24,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
  },
});
