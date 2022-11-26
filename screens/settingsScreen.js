import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  bgLight,
  bgPrimary,
  bgSecondary,
  colorFb,
  lightDark,
  Size,
  colorGoogle,
  offset,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useProfileQuery} from '../feature/services/query';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {logOut} from '../feature/reducers/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import userIcon from '../assets/images/user.png';
import {RenderError} from '../components';

export const SettingsScreen = ({navigation}) => {
  const {loginId} = useSelector(state => state.auth);
  const {data, error, isLoading} = useProfileQuery(loginId, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const dispatch = useDispatch();

  if (error && error?.data === 'Unauthorized') {
    dispatch(logOut());
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />

      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              backgroundColor: bgSecondary,
              padding: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingTop: offset + 10,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('Messages')}>
              <Ionicons
                name="notifications-sharp"
                size={Size}
                color={bgPrimary}
              />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color={bgPrimary} />
              <Text style={[styles.titleMd, {marginTop: 8}]}>
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
              <RenderError
                error={error?.message || error?.error.split(':')[1]}
              />
            </View>
          ) : (
            <Animated.View
              style={{paddingHorizontal: 16, flex: 1}}
              entering={FadeIn}
              exiting={FadeOut}>
              <View style={styles.accountContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.titleLg}>Account</Text>
                </View>
                {data?.user && (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical: 16,
                    }}
                    onPress={() => navigation.navigate('Profile')}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.accountImage}>
                        <Image
                          source={
                            data?.user?.profilePicture
                              ? {uri: data?.user?.profilePicture?.url}
                              : userIcon
                          }
                          resizeMode="cover"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      <View style={{marginLeft: 16, alignItems: 'center'}}>
                        <Text style={styles.titleLg}>
                          {data?.user?.username}
                        </Text>
                        <Text style={styles.description}>
                          {data?.user?.bios}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('Profile')}>
                      <Ionicons
                        name="chevron-forward"
                        color={bgPrimary}
                        size={Size}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}

                {!data?.user?.verified && (
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      color: colorGoogle,
                      marginTop: 8,
                    }}>
                    Account is not verified
                  </Text>
                )}

                {!data?.user?.verified && (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{alignSelf: 'center'}}
                    onPress={() => navigation.navigate('Verify')}>
                    <Text style={[styles.backText, {color: colorFb}]}>
                      Verify Now
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* app settings// */}
              <View
                style={[
                  styles.accountContainer,
                  {marginTop: 16, borderRadius: 20},
                ]}>
                <Text style={styles.titleLg}>App Settings</Text>

                <TouchableOpacity style={styles.settingsList} activeOpacity={1}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="settings" color={bgPrimary} size={Size} />
                    <Text style={styles.listText}>Settings</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      name="chevron-forward"
                      color={bgPrimary}
                      size={Size}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsList} activeOpacity={1}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="globe" color={bgPrimary} size={Size} />
                    <Text style={styles.listText}>Language</Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    color={bgPrimary}
                    size={Size}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsList} activeOpacity={1}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      name="notifications"
                      color={bgPrimary}
                      size={Size}
                    />
                    <Text style={styles.listText}>Notification</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      name="chevron-forward"
                      color={bgPrimary}
                      size={Size}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsList} activeOpacity={1}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="help" color={bgPrimary} size={Size} />
                    <Text style={styles.listText}>Help</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      name="chevron-forward"
                      color={bgPrimary}
                      size={Size}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  zIndex: 1,
                  marginTop: offset * 2,
                  marginBottom: offset,
                }}>
                <TouchableOpacity
                  onPress={() => dispatch(logOut())}
                  activeOpacity={1}
                  style={{flexDirection: 'row'}}>
                  <Text style={[styles.titleMd, {color: colorGoogle}]}>
                    Logout
                  </Text>
                  <Ionicons name="log-out" size={24} color={colorGoogle} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
    width: '100%',
    minHeight: '100%',
  },

  backText: {
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
    color: bgPrimary,
  },

  settingsTitle: {
    color: lightDark,
    fontFamily: 'Outfit-Medium',
    fontSize: 24,
    marginLeft: 8,
    flex: 2,
    textAlign: 'center',
  },

  accountContainer: {
    marginTop: 16,
    backgroundColor: bgSecondary,
    padding: 20,
    borderRadius: 5,
    borderRadius: 20,
  },

  accountContents: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 16,
  },

  accountImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderColor: bgPrimary,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
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

  description: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: lightDark,
  },

  settingsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  listText: {
    color: lightDark,
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    marginLeft: 10,
  },
});
