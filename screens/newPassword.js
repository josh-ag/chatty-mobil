import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNewPasswordMutation} from '../feature/services/query';
import {
  bgLight,
  offset,
  lightDark,
  bgPrimary,
  colorDisabled,
  Size,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RenderError} from '../components';
import {RenderSuccess} from '../components';

export const NewPasswordScreen = ({navigation}) => {
  /*
  ********************************
  //Internal State
  ********************************
  */
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [newPassword] = useNewPasswordMutation();

  //handle reset password
  const handleReset = async () => {
    //reset state
    setIsLoading(true);
    setIsError(false);

    if (!resetCode) {
      setIsLoading(false);
      setIsError('Reset Code Field Empty');
      return;
    }
    if (!password) {
      setIsLoading(false);
      setIsError('New Password Field Empty');
      return;
    }
    if (!confirmPassword) {
      setIsLoading(false);
      setIsError('Confirm Password Field Empty');
      return;
    }
    if (password !== confirmPassword) {
      setIsLoading(false);
      setIsError('Confirmation Password Do Not Match');
      return;
    }

    try {
      const newPasswd = {password, resetCode};
      const {data, error} = await newPassword(newPasswd);

      if (error) {
        // console.log('Error: ', error);
        setIsLoading(false);
        setIsError(error?.data?.message || error?.error.split(':')[1]);
        return;
      }

      setSuccess(data?.message);
      setTimeout(() => navigation.navigate('Login'), 4000);
    } catch (err) {
      //handle error
    }
  };

  //clear Error State
  if (isError) {
    setTimeout(() => setIsError(false), 4000);
  }
  //clear success state
  if (success) {
    setTimeout(() => setSuccess(false), 4000);
  }
  const icon = visible ? 'eye-sharp' : 'eye-off-sharp';

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={{backgroundColor: bgLight, flex: 1}}>
        {isError && <RenderError error={isError} />}
        {success && <RenderSuccess success={success} />}
        <ScrollView
          bounces={false}
          contentContainerStyle={{paddingHorizontal: 16}}>
          <View style={{paddingTop: offset}}>
            <Text style={styles.title}>New Password</Text>

            <TextInput
              onChangeText={code => setResetCode(code)}
              value={resetCode}
              maxLength={6}
              keyboardType="number-pad"
              name="resetCode"
              placeholder="Enter Reset Code Here"
              placeholderTextColor={lightDark}
              style={[styles.textInput, {marginTop: 20}]}
            />
            <View style={{justifyContent: 'center'}}>
              <TextInput
                onChangeText={passwd => setPassword(passwd)}
                value={password}
                name="password"
                keyboardType="password"
                placeholder="Enter New Password"
                placeholderTextColor={lightDark}
                style={styles.textInput}
                secureTextEntry={visible}
              />

              <TouchableOpacity
                style={{position: 'absolute', right: 16}}
                onPress={() => setVisible(!visible)}>
                <Ionicons name={icon} size={Size - 6} color={lightDark} />
              </TouchableOpacity>
            </View>

            <TextInput
              onChangeText={confirm => setConfirmPassword(confirm)}
              value={confirmPassword}
              name="password"
              keyboardType="password"
              placeholder="Confirm Password"
              placeholderTextColor={lightDark}
              style={styles.textInput}
              onSubmitEditing={handleReset}
              secureTextEntry={visible}
            />

            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.btnLogin,
                {
                  backgroundColor: isLoading ? colorDisabled : bgPrimary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={handleReset}>
              <Text
                style={[
                  styles.btnLoginText,
                  {color: isLoading ? lightDark : bgLight},
                ]}>
                Reset
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
          </View>
        </ScrollView>
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
    fontSize: 24,
    color: lightDark,
    fontFamily: 'Outfit-Medium',
    marginTop: 30,
  },

  textInput: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: colorDisabled,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Outfit-Light',
    color: lightDark,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 16,
  },

  btnLogin: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 50,
    backgroundColor: bgPrimary,
    marginTop: 8,
  },

  btnLoginText: {
    fontSize: 18,
    fontFamily: 'Outfit-Medium',
    color: bgLight,
    textAlign: 'center',
  },
});
