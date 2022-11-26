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
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  useProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
} from '../feature/services/query';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {
  offset,
  bgPrimary,
  bgSecondary,
  Size,
  bgLight,
  lightDark,
  colorDisabled,
  colorSuccess,
} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import userIcon from '../assets/images/user.png';
import {RenderError, RenderSuccess} from '../components';
const RNFS = require('react-native-fs');

const ModalComponent = ({modal}) => {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'rgba(204, 204, 204, .7)'}
      />
      <Modal visible={modal} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'rgba(204, 204, 204, .7)',
          }}>
          <View
            style={{
              borderRadius: 12,
              marginTop: offset * 1.5,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: lightDark,
              height: 100,
              width: 150,
            }}>
            <ActivityIndicator color={colorSuccess} />
            <Text
              style={{
                color: bgLight,
                marginTop: 8,
                fontFamily: 'Outfit-Light',
                fontSize: 16,
              }}>
              Please wait...
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

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
  const [type, setType] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isError, setIsError] = useState(null);
  const [modal, setModal] = useState(false);

  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfilePicture] = useUpdateProfilePictureMutation();
  const {loginId} = useSelector(state => state.auth);
  const {data, error, isLoading} = useProfileQuery(loginId, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
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

    const {data: updateRes, error: updateError} = await updateProfile({
      id: loginId,
      updatedUser,
    });

    if (updateError) {
      setLoading(false);
      setIsError(updateError?.message || updateError?.error.split(':')[1]);

      return;
    }

    // reset state
    setLoading(false);
    setSuccess(updateRes?.message);
    setFirstname('');
    setLastname('');
    setUsername('');
    setBios('');
  };

  //SELECT A FILE
  const handlePickFile = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images,
        copyTo: 'cachesDirectory',
      });

      if (file) {
        setType(file.type);
        setFile(file.fileCopyUri);
      }
    } catch (err) {
      //handle error
    }
  };

  // handle update profile picture
  const handleUpdateProfilePicture = async () => {
    //RESET STATE
    setUploading(true);
    setModal(true);
    setIsError(false);

    if (!file) return;

    //ALLOW READING FILE AS BASE64 STRING
    const base64String = await RNFS.readFile(file, 'base64');

    if (!base64String) return console.log('Image Does not exist!');

    const uploads = `data:${type};base64,` + base64String;

    const {data, error} = await updateProfilePicture({
      uploads,
    });

    if (error) {
      console.log(error);
      setUploading(false);
      setModal(false);
      setFile(null);
      setIsError(
        error?.data?.message || error?.message || error?.error.split(':')[1],
      );
      return;
    }

    setUploading(false);
    setModal(false);
    setSuccess(data?.message);
    setFile(null);
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

      {modal && <ModalComponent modal={modal} loading={uploading} />}
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
                  file
                    ? {uri: file}
                    : data?.user?.profilePicture
                    ? {uri: data?.user?.profilePicture?.url}
                    : userIcon
                }
                resizeMode="cover"
                style={styles.accAvatar}
              />
              <View
                style={{
                  marginLeft: 8,
                  alignSelf: 'flex-end',
                  marginBottom: 16,
                }}>
                <TouchableOpacity
                  onPress={handlePickFile}
                  activeOpacity={1}
                  style={{marginTop: offset, marginLeft: 8}}>
                  <Ionicons name="camera" color={bgPrimary} size={Size - 6} />
                </TouchableOpacity>
                {file && (
                  <TouchableOpacity
                    style={{marginTop: 6}}
                    activeOpacity={1}
                    onPress={handleUpdateProfilePicture}>
                    <Text
                      style={[
                        styles.backText,
                        {fontFamily: 'Outfit-Regular', fontSize: 16},
                      ]}>
                      Save
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
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
                    disabled={
                      firstname || lastname || username || bios ? false : true
                    }
                    onPress={handleUpdate}
                    style={{
                      padding: 16,
                      borderRadius: 40,
                      backgroundColor:
                        !loading && (firstname || lastname || username || bios)
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
                        color:
                          !loading &&
                          (firstname || lastname || username || bios)
                            ? bgLight
                            : lightDark,
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
