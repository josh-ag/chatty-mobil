import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
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
import {deviceTypeAndroid} from '../utils/platforms';
import {useProfileQuery} from '../feature/services/query';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {logOut} from '../feature/reducers/authReducer';
import {useDispatch} from 'react-redux';

const {width} = Dimensions.get('window');

export const SettingsScreen = ({navigation}) => {
  const {data, error, isLoading} = useProfileQuery();
  const [message, setMessage] = useState(false);
  // const [isError, setIsError] = useState(error);

  const dispatch = useDispatch();

  if (error && error?.data === 'Unauthorized') {
    dispatch(logOut());
  }

  // console.log(isLoading);
  // console.log(error);

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
        zIndex: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorGoogle,
      }}>
      <Text style={{color: bgLight, fontFamily: 'Outfit-Light', fontSize: 18}}>
        {error?.error.split(':')[1]}
      </Text>
    </Animated.View>
  );
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />

      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        {error && <RenderError />}
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

          <View style={{paddingHorizontal: 16, flex: 1}}>
            <View style={styles.accountContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleLg}>Account</Text>

                {isLoading && <ActivityIndicator color={bgPrimary} />}
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
                      <Ionicons name="person" size={Size} color={bgPrimary} />
                    </View>
                    <View style={{marginLeft: 16, alignItems: 'center'}}>
                      <Text style={styles.titleLg}>{data?.user?.username}</Text>
                      <Text style={styles.description}>{data?.user?.bios}</Text>
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

              {data?.user.emailVerified && (
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: colorFb,
                    marginTop: 8,
                  }}>
                  You need to verify your email
                </Text>
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
          </View>
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 16,
            position: 'absolute',
            zIndex: 1,
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <TouchableOpacity
            onPress={() => dispatch(logOut())}
            activeOpacity={1}
            style={{flexDirection: 'row'}}>
            <Text style={[styles.titleMd, {color: colorGoogle}]}>Logout</Text>
            <Ionicons name="log-out" size={24} color={colorGoogle} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
    width: '100%',
  },

  backText: {
    fontFamily: 'Outfit-Medium',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
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
    fontFamily: 'Outfit-Medium',
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
