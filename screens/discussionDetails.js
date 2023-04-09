import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Dimensions,
  TextInput,
} from 'react-native';
import {
  bgLight,
  bgPrimary,
  bgSecondary,
  lightDark,
  offset,
  Size,
} from '../utils/colors';
import Svg, {Path} from 'react-native-svg';
import {deviceTypeAndroid} from '../utils/platforms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {io} from 'socket.io-client';
import {useProfileQuery} from '../feature/services/query';
const socket = io('https://6727-105-112-24-5.eu.ngrok.io');

const barHeight = 200;

export const DiscussionDetails = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const [numberOfLine, setNumberOfLine] = useState(1);
  const [offsetY, setOffsetY] = useState(0);

  const {data} = useProfileQuery();
  const {selected} = route.params;

  const {height} = Dimensions.get('window');

  const handleJoin = () => {
    // alert user of incoming features
    Alert.alert(
      'Aah!',
      `${selected?.title} chat Isn't available yet. Click join to be whitelisted for this feature when available`,
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Nothing was done!'),
          style: 'cancel',
        },

        {
          text: 'Join waiting list',
          onPress: () => {
            //emit join message
            socket.emit('join', {
              room: selected?.title,
              id: socket.id,
              user: {username: data?.user},
            });
            Alert.alert(
              'Congratulations!',
              `You have been whitelisted for this category`,
            );
          },
        },
      ],
    );
  };

  const handleSubmit = () => {
    if (!message) {
      return;
    }
    Alert.alert('New Message', message);
    //reset state
    setMessage('');
  };

  useEffect(() => {
    socket.on(`new ${selected?.title} member`, data => {
      console.log(data);
    });
  });

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-contents"
        backgroundColor={'transparent'}
      />

      <SafeAreaView style={{flex: 1, backgroundColor: bgSecondary}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            height: barHeight - 100,
            paddingBottom: 10,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9,
            backgroundColor:
              offsetY >= barHeight - 100 ? bgPrimary : 'transparent',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={navigation.goBack}>
            <Ionicons name="chevron-back" color={bgLight} size={Size} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              height={Size}
              width={Size}>
              <Path
                d="M10.4 26.4q-1 0-1.7-.7T8 24q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm13.6 0q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7t.7 1.7q0 1-.7 1.7t-1.7.7Zm13.6 0q-1 0-1.7-.7t-.7-1.7q0-1 .7-1.7t1.7-.7q1 0 1.7.7T40 24q0 1-.7 1.7t-1.7.7Z"
                fill={bgLight}
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={e => {
            setOffsetY(Math.floor(e.nativeEvent.contentOffset.y));
          }}>
          <ImageBackground
            source={selected?.poster}
            style={[styles.bannerImage, {height: barHeight}]}
            resizeMode="cover">
            <View
              style={{
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 40,
                alignSelf: 'flex-end',
                // backgroundColor: 'blue',
              }}>
              <Text style={styles.title}>#{selected?.title}</Text>

              <TouchableOpacity
                activeOpacity={1}
                onPress={handleJoin}
                style={{
                  paddingBottom: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20,
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={[
                    styles.description,
                    {marginRight: 5, color: bgLight},
                  ]}>
                  Join
                </Text>
                <View
                  style={{
                    backgroundColor: '#3b5998',
                    borderRadius: 20,
                    // padding: 5,
                  }}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    height={Size}
                    width={Size}>
                    <Path
                      d="M23.25 37V24.75H11v-1.5h12.25V11h1.5v12.25H37v1.5H24.75V37Z"
                      fill={bgLight}
                    />
                  </Svg>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={{marginBottom: height}} />
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'auto',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'transparent',
          }}>
          <TextInput
            placeholder="Start typing ..."
            placeholderTextColor={bgSecondary}
            value={message}
            onChangeText={msg => setMessage(msg)}
            onSubmitEditing={handleSubmit}
            style={{
              borderWidth: 1,
              borderColor: bgSecondary,
              flex: 1,
              height: 'auto',
              backgroundColor: bgPrimary,
              paddingLeft: 16,
              paddingRight: 45,
              fontFamily: 'Outfit-Light',
              fontSize: 18,
              paddingVertical: 16,
              maxHeight: 120,
            }}
            clearButtonMode="while-editing"
            scrollEnabled={true}
            multiline
            allowFontScaling={false}
            numberOfLines={numberOfLine}
            textAlignVertical="top"
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              position: 'absolute',
              right: 12,
              zIndex: 99,
            }}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              height={Size + 8}
              width={Size + 8}>
              <Path
                d="M9.05 37.6q-.75.3-1.4-.1Q7 37.1 7 36.35V28.3q0-.55.325-.925t.825-.475L20.2 24 8.15 21.05q-.5-.15-.825-.525Q7 20.15 7 19.65v-8q0-.75.65-1.15.65-.4 1.4-.15l29.2 12.3q.85.4.85 1.375t-.85 1.325Z"
                fill={bgSecondary}
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  backText: {
    fontFamily: 'Outfit-Light',
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 30,
    color: bgLight,
  },

  bannerImage: {
    width: '100%',
  },

  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 27,
    color: lightDark,
    fontFamily: 'Outfit',
  },

  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 24 : 30,
    fontFamily: 'Outfit-Bold',
    color: bgLight,
    textAlign: 'center',
    marginLeft: 20,
    alignSelf: 'flex-end',
    textAlign: 'center',
    paddingBottom: 8,
  },
});
