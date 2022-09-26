import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  bgLight,
  bgPrimary,
  bgSecondary,
  colorFb,
  lightDark,
  Size,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deviceTypeAndroid} from '../utils/platforms';
import {useSelector} from 'react-redux';

export const SettingsScreen = ({navigation}) => {
  const {user} = useSelector(state => state.globals);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={bgSecondary} />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
              backgroundColor: bgSecondary,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="chevron-back" color={bgPrimary} size={Size} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.settingsTitle}>Settings</Text>
          </View>

          <View style={styles.accountContainer}>
            <Text style={styles.titleLg}>Account</Text>
            <View style={styles.accountContents}>
              <View style={styles.accountImage}>
                <Ionicons name="person" size={Size} color={bgPrimary} />
              </View>
              <View style={{flex: 2, alignItems: 'center'}}>
                <Text style={styles.titleMd}>{user.username}</Text>
                <Text style={styles.description}>
                  {user.bios || user.email}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Ionicons
                  name="chevron-forward"
                  color={bgPrimary}
                  size={Size}
                />
              </TouchableOpacity>
            </View>

            {!user?.emailVerified && (
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
          <View style={[styles.accountContainer, {marginTop: 20}]}>
            <Text style={styles.titleLg}>App Settings</Text>
            <TouchableOpacity style={styles.settingsList}>
              <Ionicons name="globe" color={bgPrimary} size={Size} />
              <Text style={styles.listText}>Language</Text>
              <TouchableOpacity>
                <Ionicons
                  name="chevron-forward"
                  color={bgPrimary}
                  size={Size}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsList}>
              <Ionicons name="notifications" color={bgPrimary} size={Size} />
              <Text style={styles.listText}>Notification</Text>
              <TouchableOpacity>
                <Ionicons
                  name="chevron-forward"
                  color={bgPrimary}
                  size={Size}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsList}>
              <Ionicons name="help" color={bgPrimary} size={Size} />
              <Text style={styles.listText}>Help</Text>
              <TouchableOpacity>
                <Ionicons
                  name="chevron-forward"
                  color={bgPrimary}
                  size={Size}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
  },

  backText: {
    fontFamily: 'Outfit-Medium',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: bgPrimary,
  },

  settingsTitle: {
    color: lightDark,
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    marginLeft: 8,
    flex: 2,
    textAlign: 'center',
  },

  accountContainer: {
    marginTop: 20,
    backgroundColor: bgSecondary,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
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
    color: lightDark,
    fontFamily: 'Outfit-Medium',
    fontSize: 21,
    marginTop: 20,
  },

  titleMd: {
    fontFamily: 'Outfit-Medium',
    fontSize: 21,
    color: lightDark,
    marginBottom: 10,
  },

  description: {
    fontFamily: 'Outfit',
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
    fontFamily: 'Outfit-Medium',
    fontSize: 16,
  },
});
