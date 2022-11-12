import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import {
  bgLight,
  bgPrimary,
  Size,
  lightDark,
  textDark,
  bgSecondary,
  offset,
} from '../utils/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {deviceTypeAndroid} from '../utils/platforms';

export const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState(null);

  const handleSubmit = async () => {
    if (!search) {
      return Alert.alert('No Search Param Provided!');
    }

    Alert.alert(`Looking for "${search}" in our database...`);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: bgLight,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <View
            style={{
              justifyContent: 'space-around',
              backgroundColor: bgSecondary,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              padding: 16,
              paddingTop: offset + 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bgSecondary,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleSubmit}
                style={{position: 'absolute', left: 35, zIndex: 100}}>
                <Ionicons name="search" size={Size / 1.5} color={bgPrimary} />
              </TouchableOpacity>
              <TextInput
                onSubmitEditing={handleSubmit}
                onChangeText={txt => setSearch(txt)}
                placeholder="Search"
                style={{
                  width: '100%',
                  borderRadius: 50,
                  paddingLeft: 60,
                  color: textDark,
                  fontFamily: 'Outfit',
                  fontSize: 16,
                  backgroundColor: bgLight,
                  borderWidth: 1,
                  borderColor: lightDark,
                }}
                placeholderTextColor={lightDark}
                autoFocus={true}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
