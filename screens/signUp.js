import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  bgLight,
  lightDark,
  bgPrimary,
  colorGoogle,
  colorDisabled,
  Size,
  bgSecondary,
  colorSuccess,
} from '../utils/colors';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {deviceTypeAndroid} from '../utils/platforms';
import {SuccessComponent} from '../components/success';
import Animated, {
  SlideInUp,
  SlideInLeft,
  SlideOutUp,
  SlideOutRight,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';
import {userRegister} from '../utils/operations';

export const SignupErrorComponent = ({
  message,
  isError = !!message,
  setError,
}) => {
  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
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
          backgroundColor: bgLight,
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
            zIndex: 100,
          }}>
          <Animated.View
            entering={SlideInUp}
            exiting={SlideOutUp}
            style={{
              height: 60,
              width,
              backgroundColor: colorGoogle,
              paddingTop: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              top: 0,
              left: 0,
              zIndex: 100,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', right: 50, top: 5}}
              onPress={() => setError(null)}>
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
              <FontAwesome5
                name="info-circle"
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

export const SignUpScreen = ({navigation}) => {
  /*
  ********************************
  //Internal Signup State
  ********************************
  */
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const iconName = visible ? 'eye-off' : 'eye';

  //validate email authenticity
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleRegister = async () => {
    /*
    ********************************
    //Reset error state
    ********************************
  */
    setIsLoading(true);
    setError(false);

    if (!firstname || !lastname || !username || !email || !password) {
      setIsLoading(false);
      setError('Missing parameters');
      return;
    }

    if (!emailPattern.test(email)) {
      setIsLoading(false);
      setError('Invalid email adddress');
      return;
    }

    const registrationInfo = {firstname, lastname, username, email, password};
    const response = await userRegister(registrationInfo);

    console.log('Signup Response: ', response);
    if (
      response.statusCode === 400 ||
      response.statusCode === 500 ||
      response.error
    ) {
      setIsLoading(false);
      setError(response.error.message);
      return;
    }

    setTimeout(() => {
      navigation.navigate('Login');
      setIsLoading(false);
      setSuccess(response.success.message);
    }, 2000);
  };

  const {width} = useWindowDimensions();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={bgLight} />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        {error && <SignupErrorComponent message={error} setError={setError} />}

        {success && (
          <SuccessComponent message={success} setSuccess={setSuccess} />
        )}

        {isLoading ? (
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
          <Text style={styles.title}> Signup Chatty!</Text>

          <View
            style={{
              marginVertical: 20,
            }}>
            <View style={styles.fieldContainer}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                }}>
                <Ionicons
                  name="person"
                  color={colorDisabled}
                  size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
                />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={colorDisabled}
                placeholder="Firstname*"
                style={styles.textInput}
                defaultValue={firstname}
                onChangeText={fName => setFirstname(fName)}
              />
            </View>
            <View style={styles.fieldContainer}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                }}>
                <Ionicons
                  name="person"
                  color={colorDisabled}
                  size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
                />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={colorDisabled}
                placeholder="Lastname*"
                style={styles.textInput}
                defaultValue={lastname}
                onChangeText={lName => setLastname(lName)}
              />
            </View>
            <View style={styles.fieldContainer}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                }}>
                <Ionicons
                  name="person-add"
                  color={colorDisabled}
                  size={deviceTypeAndroid === 'Handset' ? Size : Size * 1.5}
                />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={colorDisabled}
                placeholder="Username*"
                style={styles.textInput}
                defaultValue={username}
                onChangeText={uName => setUsername(uName)}
              />
            </View>

            <View style={styles.fieldContainer}>
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
                placeholder="Email*"
                style={styles.textInput}
                defaultValue={email}
                onChangeText={mail => setEmail(mail)}
              />
            </View>
            <View style={styles.fieldContainer}>
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
                style={styles.textInput}
                placeholder="Password*"
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
            <TouchableOpacity onPress={handleRegister} style={styles.btnSignup}>
              <Text style={styles.btnSignupText}>Sign-Up</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: deviceTypeAndroid === 'Handset' ? 14 : 20,
                fontFamily: 'Outfit-Medium',
                color: lightDark,
                marginTop: 10,
                textAlign: 'center',
              }}>
              By registering, you acknowledge and agree to our{' '}
              <Text style={{textDecorationLine: 'underline'}}>
                Terms of use and privacy policy
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{...styles.btnSocial, backgroundColor: bgPrimary}}>
              <FontAwesome5 name="facebook-f" color={bgLight} size={Size} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSocial}>
              <MaterialCommunityIcons
                name="google"
                color={bgLight}
                size={Size}
                style={{borderRadius: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.btnSocial, backgroundColor: bgPrimary}}>
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
            <Text style={styles.textInfo}>Already have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  ...styles.textInfo,
                  fontWeight: 'bold',
                  color: bgPrimary,
                }}>
                Sign-In
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
    paddingHorizontal: 40,
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
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    fontFamily: 'Outfit-Medium',
    color: bgPrimary,
    marginTop: 10,
  },

  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    color: lightDark,
  },

  fieldContainer: {
    marginTop: 20,
  },

  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colorDisabled,
    marginBottom: 10,
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
    paddingLeft: deviceTypeAndroid === 'Handset' ? 45 : 60,
  },

  btnSignup: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 50,
    backgroundColor: bgPrimary,
    marginTop: 20,
  },

  btnSignupText: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    color: bgLight,
    textAlign: 'center',
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
