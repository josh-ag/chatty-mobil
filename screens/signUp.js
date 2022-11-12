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
  offset,
} from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deviceTypeAndroid} from '../utils/platforms';
import {useRegisterMutation} from '../feature/services/query';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';

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
  const [register] = useRegisterMutation();

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
    const {data, error} = await register(registrationInfo);

    if (error) {
      setIsLoading(false);
      return setError(error?.data.message || error?.error);
    }

    if (data) {
      setIsLoading(false);
      setSuccess(data?.message || 'Registration Successful');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    }
  };

  const {width} = useWindowDimensions();

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
        backgroundColor: colorSuccess,
      }}>
      <Text style={{color: bgLight, fontFamily: 'Outfit-Light', fontSize: 18}}>
        {success}
      </Text>
    </Animated.View>
  );

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
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

        {error && <RenderError />}
        {success && <RenderSuccess />}
        <ScrollView
          contentContainerStyle={[
            styles.contentsContainer,
            {paddingTop: offset},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <TouchableOpacity
              activeOpacity={1}
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
          <Text style={styles.title}> Signup</Text>

          <View
            style={{
              marginVertical: 20,
            }}>
            <View style={styles.fieldContainer}>
              <TouchableOpacity
                activeOpacity={1}
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
                activeOpacity={1}
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
                activeOpacity={1}
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
                activeOpacity={1}
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
            <View>
              <TouchableOpacity
                activeOpacity={1}
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
              activeOpacity={1}
              onPress={handleRegister}
              style={styles.btnSignup}>
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
              activeOpacity={1}
              style={{...styles.btnSocial, backgroundColor: bgPrimary}}>
              <FontAwesome5 name="facebook-f" color={bgLight} size={Size} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={styles.btnSocial}>
              <MaterialCommunityIcons
                name="google"
                color={bgLight}
                size={Size}
                style={{borderRadius: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
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
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Login')}>
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
    paddingHorizontal: 16,
    alignSelf: 'center',
  },

  logoContainer: {
    flexDirection: 'column',
    marginBottom: 40,
  },

  backText: {
    fontFamily: 'Outfit-Light',
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
    fontFamily: 'Outfit-Medium',
    color: lightDark,
  },

  fieldContainer: {
    marginBottom: 12,
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
