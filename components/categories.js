import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  bgLight,
  Size,
  bgPrimary,
  lightDark,
  bgSecondary,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deviceTypeAndroid} from '../utils/platforms';
import {useSelector} from 'react-redux';
import Animated, {SlideInLeft, SlideInUp} from 'react-native-reanimated';

//List Footer
const ListFooterComponent = () => (
  <View>
    <Text
      style={[
        styles.description,
        {
          fontWeight: '500',
          textAlign: 'center',
          marginBottom: 0,
          position: 'relative',
          left: 0,
          color: lightDark,
        },
      ]}>
      I have interest on something else?
    </Text>
    <TouchableOpacity
      style={[
        styles.btnLogin,
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
        },
      ]}>
      <Text style={styles.btnLoginText}>Create Discussion</Text>
      <Ionicons name="git-commit" size={Size - 5} color={bgLight} />
    </TouchableOpacity>
  </View>
);

//ListHeader
const ListHeaderComponent = () => (
  <View style={{paddingTop: 70}}>
    <Text style={styles.title}>Trending Discussions</Text>
  </View>
);

export const Categories = ({navigation, scrollY, handleGetUser}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [endThreshholdReached, setEndThresholdReached] = useState(false);

  const {discussionList, user} = useSelector(state => state.globals);

  const onImagePressed = isSelected => {
    // setCategory(isSelected);
    Alert.alert(
      'Notification',
      `${isSelected} chat Isn't available yet. Click join to be whitelisted for this feature when available`,
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Nothing was done!'),
          style: 'cancel',
        },

        {
          text: 'Join waiting list',
          onPress: () =>
            Alert.alert(
              `You have been whitelisted for the category ${isSelected} chat`,
            ),
        },
      ],
    );
  };

  const _renderItem = props => {
    return (
      <Animated.View
        entering={SlideInLeft.delay(props.index * 100)}
        style={{
          width: '100%',
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          style={{height: 200, borderRadius: 50}}
          onPress={() =>
            navigation.navigate('Discussion', {id: props.item.key})
          }>
          <ImageBackground
            source={props.item.poster}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
            }}>
            <Text style={styles.description}>#{props.item.title}</Text>
            <TouchableOpacity
              onPress={() => onImagePressed(props.item.title)}
              style={{
                position: 'absolute',
                right: 30,
                top: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: bgLight,
                  fontSize: deviceTypeAndroid === 'Handset' ? 16 : 27,
                  fontFamily:
                    deviceTypeAndroid === 'Handset'
                      ? 'Outfit-Medium'
                      : 'Outfit-Bold',
                  marginRight: 5,
                }}>
                Join
              </Text>
              <View
                style={{
                  backgroundColor: '#3b5998',
                  borderRadius: 50,
                  padding: 5,
                }}>
                <Ionicons name="add" size={Size / 1.5} color={bgLight} />
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      entering={SlideInUp}
      stickyHeaderHiddenOnScroll={true}
      data={discussionList}
      renderItem={_renderItem}
      keyExtractor={(_, key) => key}
      ListHeaderComponent={ListHeaderComponent}
      ListHeaderComponentStyle={{paddingBottom: 16}}
      ListFooterComponent={endThreshholdReached && ListFooterComponent}
      ListFooterComponentStyle={{paddingTop: 20}}
      contentContainerStyle={{
        paddingVertical: 20,
        width: useWindowDimensions().width - 40,
        alignSelf: 'center',
      }}
      getItemLayout={(length, index) => ({length, index})}
      refreshing={refreshing}
      onRefresh={async () => {
        setRefreshing(true);
        // setTimeout(() => setRefreshing(false), 5000);
        await handleGetUser();

        setRefreshing(false);
      }}
      progressViewOffset={60}
      onEndReached={() => {
        setEndThresholdReached(true);
      }}
      onScroll={e => {
        scrollY.setValue(e.nativeEvent.contentOffset.y);
      }}
    />
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 20 : 27,
    fontFamily: 'Outfit-Medium',
    color: bgSecondary,
    marginBottom: 10,
    position: 'absolute',
    left: 20,
    bottom: 0,
    right: 0,
  },

  title: {
    fontSize: deviceTypeAndroid === 'Handset' ? 22 : 35,
    fontFamily: 'Outfit-Bold',
    color: lightDark,
    textAlign: 'center',
    marginTop: 10,
  },

  btnLogin: {
    alignSelf: 'center',
    padding: 15,
    width: '100%',
    borderRadius: 50,
    backgroundColor: bgPrimary,
    marginTop: 20,
  },
  btnLoginText: {
    fontSize: deviceTypeAndroid === 'Handset' ? 18 : 24,
    marginRight: 5,
    fontFamily:
      deviceTypeAndroid === 'Handset' ? 'Outfit-Medium' : 'Outfit-Bold',
    color: bgLight,
    textAlign: 'center',
  },
});
