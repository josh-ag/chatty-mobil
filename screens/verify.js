import {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  bgLight,
  bgPrimary,
  lightDark,
  offset,
  Size,
  colorDisabled,
} from '../utils/colors';
import {useVerifyMutation} from '../feature/services/query';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {OTP} from 'react-native-otp-form';
import {RenderError} from '../components';

export const VerifyScreen = ({navigation}) => {
  /*
  ********************************
  //Internal State
  ********************************
  */
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');

  const [verify] = useVerifyMutation();

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(false);

    const code = {verifyCode};

    const {data, error} = await verify(code);

    if (error) {
      setIsLoading(false);
      console.log('Error: ', error);
      setIsError(error?.data?.message || error?.error.split(': ')[1]);
    } else {
      navigation.navigate('ConfirmationSuccess');
    }
  };
  //clear Error
  if (isError) {
    setTimeout(() => setIsError(false), 4000);
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'} translucent />
      <SafeAreaView
        style={{flex: 1, backgroundColor: bgLight, paddingTop: offset + 16}}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}
          onPress={navigation.goBack}>
          <Ionicons name="chevron-back" color={bgPrimary} size={Size} />
          <Text
            style={{
              color: bgPrimary,
              fontSize: 16,
              fontFamily: 'Outfit-Regular',
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <View style={{paddingHorizontal: 16, marginTop: 16}}>
          <Text
            style={{
              color: lightDark,
              fontFamily: 'Outfit-Bold',
              marginLeft: 12,
              fontSize: 18,
            }}>
            Enter Your Six Digit Verification Code Here
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <OTP
              key={6}
              codeCount={6}
              otpStyles={{
                borderColor: bgPrimary,
                borderWidth: 2,
                borderRadius: 10,
                width: 45,
                height: 45,
                color: lightDark,
                fontSize: 20,
                fontFamily: 'Outfit-Medium',
                textAlign: 'center',
              }}
              keyboardType="number-pad"
              onFinish={code => setVerifyCode(code)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            disabled={isLoading || false}
            onPress={handleSubmit}
            style={[
              {
                padding: 16,
                marginTop: 16,
                alignSelf: 'center',
                borderRadius: 40,
                width: '95%',
              },
              {
                backgroundColor:
                  !verifyCode || isLoading ? colorDisabled : bgPrimary,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Text
              style={{
                color: !verifyCode || isLoading ? lightDark : bgLight,
                fontFamily: 'Outfit-Medium',
                textAlign: 'center',
                fontSize: 18,
              }}>
              Verify
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
        {isError && <RenderError error={isError} />}
      </SafeAreaView>
    </>
  );
};
