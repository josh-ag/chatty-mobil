import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  bgLight,
  bgPrimary,
  bgSecondary,
  colorDisabled,
  lightDark,
  offset,
  Size,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deviceTypeAndroid} from '../utils/platforms';
import {useProfileQuery} from '../feature/services/query';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {logOut} from '../feature/reducers/authReducer';
import userIcon from '../assets/images/user.png';
import {RenderError} from '../components';

export const ProfileScreen = ({navigation}) => {
  const {data, error, isLoading} = useProfileQuery();

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
          contentContainerStyle={{
            minHeight: '100%',
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
            <>
              <View style={styles.profileHeader}>
                <View style={styles.accAvatar}>
                  <Image
                    source={
                      data?.user?.profilePicture
                        ? {uri: data?.user?.profilePicture?.url}
                        : userIcon
                    }
                    resizeMode="cover"
                    style={styles.accAvatar}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileEdit')}
                  activeOpacity={1}
                  style={{marginTop: offset, marginLeft: 8}}>
                  <Ionicons
                    name="create-sharp"
                    color={bgPrimary}
                    size={Size - 6}
                  />
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
                      marginTop: 20,
                      paddingBottom: 20,
                    }}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>{data?.user.firstname}</Text>
                      <Text style={styles.labelTitle}>Firstname</Text>
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>{data?.user.lastname}</Text>
                      <Text style={styles.labelTitle}>Lastname</Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>{data?.user.username}</Text>
                      <Text style={styles.labelTitle}>Username</Text>
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>{data?.user.email}</Text>
                      <Text style={styles.labelTitle}>Email</Text>
                    </View>

                    <View style={[styles.inputContainer, {minHeight: 200}]}>
                      <Text style={styles.label}>{data?.user.bios}</Text>
                      <Text style={styles.labelTitle}>Bios</Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  backText: {
    fontFamily: 'Outfit-Regular',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: bgPrimary,
  },
  profileHeader: {
    height: 200,
    flexDirection: 'row',
    backgroundColor: bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 75,
  },

  accAvatar: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderColor: bgLight,
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
