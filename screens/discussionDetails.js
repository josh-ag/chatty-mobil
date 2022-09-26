import React, {useEffect} from 'react';

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
} from 'react-native';
import {bgLight, lightDark, Size} from '../utils/colors';
import {useSelector} from 'react-redux';
import {deviceTypeAndroid} from '../utils/platforms';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import {baseURL} from '../utils/operations';
const socket = io(baseURL);

export const DiscussionDetails = ({navigation, route}) => {
  socket.on('connection', socket => {
    console.log(socket);
    console.log('Connection successful...');
  });
  //hook up to redux store
  const {discussionList, login} = useSelector(state => state.globals);

  const discussion = discussionList.filter(_ => _.key === route.params.id);

  const handleJoin = () => {
    // alert user of incoming features
    Alert.alert(
      'Aah!',
      `${discussion[0].title} chat Isn't available yet. Click join to be whitelisted for this feature when available`,
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Nothing was done!'),
          style: 'cancel',
        },

        {
          text: 'Join waiting list',
          onPress: () => {
            Alert.alert(
              'Congratulations!',
              `You have been whitelisted for the category`,
            );

            //emit join message
            socket.emit('join', {room: discussion[0].title, id: socket.id});
          },
        },
      ],
    );
  };

  useEffect(() => {
    socket.on(`new ${discussion[0].title} member`, data => {
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

      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        <ScrollView contentContainerStyle={StyleSheet.container}>
          <ImageBackground
            source={discussion[0].poster}
            style={styles.bannerImage}>
            <TouchableOpacity
              style={{
                marginTop: 40,
                marginLeft: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={navigation.goBack}>
              <Ionicons name="chevron-back" color={bgLight} size={Size} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: '60%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 40,
              }}>
              <Text style={styles.title}>#{discussion[0].title}</Text>

              <TouchableOpacity
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
                    borderRadius: 50,
                    padding: 5,
                  }}>
                  <FontAwesome5
                    name={'plus'}
                    size={
                      deviceTypeAndroid === 'Handset' ? Size / 2 : Size / 1.5
                    }
                    color={bgLight}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
    color: bgLight,
  },

  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
