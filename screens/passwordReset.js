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
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  bgLight,
  lightDark,
  colorDisabled,
  bgPrimary,
  Size,
  offset,
} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import {useResetPasswordMutation} from '../feature/services/query';
import {RenderError, RenderSuccess} from '../components';

export const PasswordResetScreen = ({navigation}) => {
  /*
    *********************************
    INTERNAL STATE
    *********************************
*/
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [resetPassword] = useResetPasswordMutation();

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSendInstructions = async () => {
    setIsLoading(true);

    if (!resetEmail) {
      setIsLoading(false);
      setError('Field empty');
      return;
    }

    if (!emailPattern.test(resetEmail)) {
      setIsLoading(false);
      setError('Invalid email address');
      return;
    }

    try {
      const {data, error} = await resetPassword({email: resetEmail});

      if (error) {
        console.log('Error: ', error);
        setIsLoading(false);

        return setError(error?.data?.message || error?.error.split(':')[1]);
      }

      if (data) {
        setResetEmail('');
        setSuccess(data?.message);
        setIsLoading(false);
        setTimeout(() => navigation.navigate('NewPassword'), 4000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //reset Error state
  if (error) {
    setTimeout(() => setError(false), 4000);
  }
  //reset success state
  if (success) {
    setTimeout(() => setSuccess(false), 4000);
  }

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
          {error && <RenderError error={error} />}
          {success && <RenderSuccess success={success} />}
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
                onSubmitEditing={handleSendInstructions}
                placeholderTextColor={colorDisabled}
                placeholder="Email"
                style={styles.textInput}
                value={resetEmail}
                keyboardType="email-address"
                onChangeText={mail => setResetEmail(mail)}
              />
            </View>

            <TouchableOpacity
              disabled={isLoading || false}
              activeOpacity={1}
              onPress={handleSendInstructions}
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
                Send Instruction
              </Text>

              {isLoading && (
                <ActivityIndicator
                  style={{marginLeft: 12}}
                  animating={isLoading || false}
                  color={bgPrimary}
                  hidesWhenStopped={true}
                  size="small"
                />
              )}
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
    fontSize: 18,
    color: bgPrimary,
  },

  description: {
    fontSize: 18,
    color: lightDark,
    marginTop: 10,
    fontFamily: 'Outfit-Light',
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
    fontFamily: 'Outfit-Light',
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
    fontSize: 18,
    fontFamily: 'Outfit-Medium',
    color: bgLight,
    textAlign: 'center',
  },
});
