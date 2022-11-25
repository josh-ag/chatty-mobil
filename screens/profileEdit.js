import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  useProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
} from '../feature/services/query';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  SlideInDown,
  SlideOutDown,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {
  colorGoogle,
  offset,
  bgPrimary,
  bgSecondary,
  Size,
  bgLight,
  lightDark,
  colorDisabled,
} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import userIcon from '../assets/images/user.png';
import {RenderError, RenderSuccess} from '../components';

export const ProfileEditScreen = ({navigation}) => {
  /*
  ********************************
  //Internal State
  ********************************
  */
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [bios, setBios] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isError, setIsError] = useState(null);

  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfilePicture] = useUpdateProfilePictureMutation();
  const {loginId} = useSelector(state => state.auth);
  const {data, error, isLoading} = useProfileQuery(loginId);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    //RESET STATE
    setLoading(true);
    setIsError(false);
    setSuccess(false);

    const updatedUser = {
      firstname: firstname || data?.user?.firstname,
      lastname: lastname || data?.user?.lastname,
      username: username || data?.user?.username,
      bios: bios || data?.user?.bios,
    };

    // console.log(updatedUser);

    const {data, error} = await updateProfile(loginId, updatedUser);

    if (error) {
      console.log(error);
      setLoading(false);
      setIsError(error?.message || error?.error.split(':')[1]);
      return;
    }

    // reset state
    console.log(data);
    setLoading(false);
    setSuccess(data?.message);
  };

  //SELECT A FILE
  const handlePickFile = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images,
        copyTo: 'cachesDirectory',
      });

      if (file) {
        setFile(file.fileCopyUri);
      }
    } catch (err) {
      //handle error
    }
  };

  // handle update profile picture
  const handleUpdateProfile = () => {
    //RESET STATE
    setLoading(true);

    if (!file) return;
    //ALLOW READING FILE AS BASE64 STRING
    let FR = new FileReader();

    FR.onloadend = async () => {
      const {data, error} = await updateProfilePicture(FR.result);

      if (error) {
        // console.log(error);
        setLoading(false);
        return;
      }

      setLoading(false);
      setFile(null);
    };

    FR.readAsDataURL(file);
  };

  if (error && error?.data === 'Unauthorized') {
    dispatch(logOut());
  }

  //clear error state
  if (isError) {
    setTimeout(() => setIsError(null), 4000);
  }
  if (success) {
    setTimeout(() => setSuccess(null), 4000);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: bgSecondary,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: offset + 10,
            paddingBottom: 8,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={navigation.goBack}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="chevron-back" color={bgPrimary} size={Size} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={bgPrimary} />
            <Text
              style={[
                styles.titleMd,
                {fontFamily: 'Outfit-Light', marginTop: 8},
              ]}>
              Please wait....
            </Text>
          </View>
        ) : error ? (
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.titleLg}>Something Went Wrong</Text>
            <Text style={styles.titleMd}>
              We're having issue loading this page
            </Text>
            <RenderError error={error?.message || error?.error.split(':')[1]} />
          </View>
        ) : (
          <>
            <View style={styles.profileHeader}>
              <Image
                source={
                  data?.user?.profilePicture
                    ? {uri: data?.user?.profilePicture?.url}
                    : userIcon
                }
                resizeMode="cover"
                style={styles.accAvatar}
              />

              <TouchableOpacity
                onPress={handlePickFile}
                activeOpacity={1}
                style={{marginTop: offset, marginLeft: 8}}>
                <Ionicons name="camera" color={bgPrimary} size={Size - 6} />
              </TouchableOpacity>
            </View>

            <Animated.View
              style={{flex: 1}}
              entering={FadeIn}
              exiting={FadeOut}>
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: bgSecondary,
                  },
                ]}
              />
              <View
                style={{
                  flex: 1,
                  borderTopLeftRadius: 75,
                  backgroundColor: bgLight,
                }}>
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    padding: 20,
                  }}>
                  <View style={{marginBottom: 16}}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                      }}>
                      <Ionicons
                        name="person"
                        color={colorDisabled}
                        size={Size - 6}
                      />
                    </TouchableOpacity>
                    <TextInput
                      placeholderTextColor={colorDisabled}
                      placeholder="Firstname"
                      style={styles.textInput}
                      defaultValue={data?.user.firstname}
                      onChangeText={fname => setFirstname(fname)}
                    />
                  </View>
                  <View style={{marginBottom: 12}}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                      }}>
                      <Ionicons
                        name="person"
                        color={colorDisabled}
                        size={Size - 6}
                      />
                    </TouchableOpacity>
                    <TextInput
                      placeholderTextColor={colorDisabled}
                      placeholder="Lastname"
                      style={styles.textInput}
                      defaultValue={data?.user?.lastname}
                      onChangeText={lname => setLastname(lname)}
                    />
                  </View>
                  <View style={{marginBottom: 12}}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                      }}>
                      <Ionicons
                        name="person-circle"
                        color={colorDisabled}
                        size={Size - 6}
                      />
                    </TouchableOpacity>
                    <TextInput
                      placeholderTextColor={colorDisabled}
                      placeholder="Username"
                      style={styles.textInput}
                      defaultValue={data?.user?.username}
                      onChangeText={uname => setUsername(uname)}
                    />
                  </View>
                  <View style={{marginBottom: 12}}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                      }}>
                      <Ionicons
                        name="at"
                        color={colorDisabled}
                        size={Size - 6}
                      />
                    </TouchableOpacity>
                    <TextInput
                      placeholderTextColor={colorDisabled}
                      placeholder="Email"
                      style={styles.textInput}
                      defaultValue={data?.user?.email}
                    />
                  </View>
                  <View style={{marginBottom: 12}}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: deviceTypeAndroid === 'Handset' ? 16 : 8,
                      }}>
                      <Ionicons
                        name="create-outline"
                        color={colorDisabled}
                        size={Size - 6}
                      />
                    </TouchableOpacity>
                    <TextInput
                      placeholderTextColor={colorDisabled}
                      placeholder="Bios"
                      style={styles.textInput}
                      defaultValue={data?.user?.bios}
                      onChangeText={bio => setBios(bio)}
                      numberOfLines={4}
                      multiline
                    />
                  </View>

                  <TouchableOpacity
                    disabled={loading ? true : false}
                    onPress={handleUpdate}
                    style={{
                      padding: 16,
                      borderRadius: 40,
                      backgroundColor:
                        firstname || lastname || username || bios
                          ? bgPrimary
                          : colorDisabled,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        color: bgLight,
                        textAlign: 'center',
                        fontFamily: 'Outfit-Medium',
                      }}>
                      Update
                    </Text>
                    {loading && (
                      <Animated.View entering={FadeIn} exiting={FadeOut}>
                        <ActivityIndicator
                          style={{marginLeft: 12}}
                          animating={loading || false}
                          color={bgPrimary}
                          hidesWhenStopped={true}
                          size="small"
                        />
                      </Animated.View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </>
        )}
        {isError && <RenderError error={isError} />}
        {success && <RenderSuccess success={success} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 18,
    color: bgPrimary,
  },

  titleLg: {
    textTransform: 'capitalize',
    color: lightDark,
    fontFamily: 'Outfit-Medium',
    fontSize: 21,
    fontWeight: '800',
  },

  titleMd: {
    fontFamily: 'Outfit-Light',
    fontSize: 18,
    color: lightDark,
  },

  profileHeader: {
    height: 150,
    flexDirection: 'row',
    backgroundColor: bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 75,
  },

  textInput: {
    borderWidth: 0.5,
    borderColor: colorDisabled,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Outfit-Light',
    color: lightDark,
    paddingLeft: 40,
    borderRadius: 12,
  },

  accAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: bgLight,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    marginTop: 20,
    padding: 16,
    width: '90%',
    borderWidth: 1,
    borderColor: bgSecondary,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },

  label: {
    fontFamily: 'Outfit-Light',
    fontSize: 18,
    color: lightDark,
    textAlign: 'left',
  },

  labelTitle: {
    fontFamily: 'Outfit-Medium',
    fontSize: 14,
    color: colorDisabled,
  },
});
