import React, {useRef, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Animated,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Categories} from '../components/categories';
import chatIcon from '../assets/images/rounded-chat.png';
import {bgLight, bgPrimary, bgSecondary, Size} from '../utils/colors';
import {deviceTypeAndroid} from '../utils/platforms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUser} from '../utils/operations';
import {getUserInfo} from '../feature/reducers/appGlobalReducer';

const TrendingScreen = ({navigation}) => {
  //toggle appbar on-scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, 75);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 75],
    outputRange: [0, -75],
  });

  const {login} = useSelector(state => state.globals);
  const dispatch = useDispatch();

  const handleGetUser = async () => {
    const response = await getUser(login.user.id);

    if (response.data) {
      const {id, firstname, lastname, email, rooms, username, emailVerified} =
        response.data;
      dispatch(
        getUserInfo({
          firstname,
          lastname,
          email,
          rooms,
          id,
          username,
          emailVerified,
        }),
      );
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={bgSecondary} />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        <Animated.View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingLeft: 20,
            height: 75,
            position: 'absolute',
            backgroundColor: bgSecondary,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            paddingBottom: 10,
            transform: [{translateY}],
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Animated.Image
              source={chatIcon}
              style={{
                marginBottom: 10,
              }}
            />
            <Animated.Text
              style={{
                fontSize: deviceTypeAndroid === 'Handset' ? 22 : 35,
                fontFamily: 'Outfit-Bold',
                color: bgPrimary,
                marginLeft: 10,
              }}>
              Chatty
            </Animated.Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              marginRight: 20,
            }}>
            <Ionicons name="person" size={Size} color={bgPrimary} />
          </TouchableOpacity>
        </Animated.View>

        <Categories
          navigation={navigation}
          scrollY={scrollY}
          handleGetUser={handleGetUser}
        />
      </SafeAreaView>
    </>
  );
};

export default TrendingScreen;
