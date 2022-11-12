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
  colorSuccess,
  offset,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {deviceTypeAndroid} from '../utils/platforms';
import {useLoginMutation} from '../feature/services/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Authenticate} from '../feature/reducers/authReducer';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';

export const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();

  const dispatch = useDispatch();

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = async () => {
    try {
      //reset error/loading state
      setIsLoading(true);
      setError(false);

      if (!email || !password) {
        setIsLoading(false);
        return setError('Missing Parameter');
      }

      if (email && !emailPattern.test(email)) {
        setIsLoading(false);
        return setError('Invalid email address');
      }

      const loginData = {email, password};
      let {data, error} = await login(loginData);

      if (error) {
        setIsLoading(false);
        return setError(error?.data.message || error.error);
      }

      if (data) {
        setSuccess(data.message);
        await AsyncStorage.setItem('@auth_token', data?.token);

        setTimeout(() => dispatch(Authenticate()), 1000);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      console.log('Error: ', err);
    }
  };

  const iconName = visible ? 'eye-off' : 'eye';

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
        {isLoading && (
          <Animated.View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              marginTop: 100,
              left: 0,
              right: 0,
              top: 0,
              zIndex: 10,
            }}>
            <ActivityIndicator
              animating={isLoading || false}
              color={bgPrimary}
              hidesWhenStopped={true}
              size="small"
            />
          </Animated.View>
        )}
        {error && <RenderError />}
        {success && <RenderSuccess />}
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
                placeholder="Password"
                style={styles.textInput}
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
              onPress={handleLogin}
              style={styles.btnLogin}>
              <Text style={styles.btnLoginText}>Sign-In</Text>
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
              <FontAwesome5 name="facebook-f" color={bgLight} size={Size} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={styles.btnSocial}>
              <Ionicons
                name="logo-google"
                color={bgLight}
                size={Size}
                style={{borderRadius: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
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
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Signup')}>
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
