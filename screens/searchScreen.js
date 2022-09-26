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
} from '../utils/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
      <StatusBar barStyle="dark-content" backgroundColor={bgSecondary} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: bgLight,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: bgSecondary,
            }}>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="chevron-back" color={bgPrimary} size={Size} />
              <Text
                style={{
                  fontFamily: 'Outfit-Medium',
                  fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
                  color: bgPrimary,
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                backgroundColor: bgSecondary,
              }}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{position: 'absolute', left: 35, zIndex: 100}}>
                <FontAwesome5
                  name="search"
                  size={Size / 1.5}
                  color={bgPrimary}
                />
              </TouchableOpacity>
              <TextInput
                onSubmitEditing={handleSubmit}
                onChangeText={txt => setSearch(txt)}
                placeholder="Search"
                style={{
                  width: '90%',
                  borderRadius: 50,
                  paddingLeft: 40,
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
