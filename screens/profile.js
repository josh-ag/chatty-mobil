import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  bgLight,
  bgPrimary,
  bgSecondary,
  colorDisabled,
  lightDark,
  Size,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deviceTypeAndroid} from '../utils/platforms';
import {useSelector} from 'react-redux';

export const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(state => state.globals);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={bgSecondary} />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: bgSecondary,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 16,
            }}>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="chevron-back" color={bgPrimary} size={Size} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Outfit-Medium',
                  fontSize: 18,
                  color: bgPrimary,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileHeader}>
            <View style={styles.accAvatar}>
              <Ionicons name="person" color={bgLight} size={Size * 2} />
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                left: 0,
                top: 120,
                bottom: 0,
                transform: [{translateX: useWindowDimensions().width / 2 + 35}],
              }}>
              <Ionicons name="camera" color={colorDisabled} size={Size} />
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
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
                  <Text style={styles.label}>{user.firstname}</Text>
                  <Text style={styles.labelTitle}>Firstname</Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>{user.lastname}</Text>
                  <Text style={styles.labelTitle}>Lastname</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>{user.username}</Text>
                  <Text style={styles.labelTitle}>Username</Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>{user.email}</Text>
                  <Text style={styles.labelTitle}>Email</Text>
                </View>

                <View style={[styles.inputContainer, {minHeight: 200}]}>
                  <Text style={styles.label}>{user.bios || 'No bios'}</Text>
                  <Text style={styles.labelTitle}>Bios</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  backText: {
    fontFamily: 'Outfit-Medium',
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
    width: 73,
    height: 73,
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
    fontFamily: 'Outfit-Medium',
    fontSize: 24,
    color: lightDark,
    textAlign: 'left',
  },
  labelTitle: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: colorDisabled,
  },
});
