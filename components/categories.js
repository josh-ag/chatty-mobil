import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  bgLight,
  Size,
  bgPrimary,
  lightDark,
  bgSecondary,
  offset,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {deviceTypeAndroid} from '../utils/platforms';
import Animated, {FadeIn, SlideInUp} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

const discussionList = [
  {
    title: 'Metaverse',
    key: 'Meta',
    poster: require('../assets/images/meta.jpg'),
    tags: [],
    isPrivate: false,
    activeMembers: 898,
    totalMembers: 10120,
    description: '',
  },
  {
    title: 'AI',
    key: 'AI',
    poster: require('../assets/images/ai.jpg'),
    tags: [],
    status: '',
    isPrivate: false,
    activeMembers: 233,
    totalMembers: 800,
    description: '',
  },
  {
    title: 'BlockChain',
    key: 'blockchain',
    poster: require('../assets/images/blockchain.jpg'),
    tags: [],
    isPrivate: false,
    activeMembers: 2091,
    totalMembers: 3096,
    description: '',
  },
  {
    title: 'Aria Photography',
    key: 'Aria Photography',
    poster: require('../assets/images/aria_photography.jpg'),
    tags: [],
    isPrivate: false,
    activeMembers: 105,
    totalMembers: 500,
    description: '',
  },
  {
    title: 'Climate Change',
    key: 'Climate Change',
    poster: require('../assets/images/climate.jpg'),
    tags: [],
    isPrivate: false,
    activeMembers: 10,
    totalMembers: 45,
    description: '',
  },
];

//List Footer
const ListFooterComponent = () => (
  <View>
    <Text
      style={[
        styles.description,
        {
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
      activeOpacity={1}
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
  <View>
    <Text style={styles.title}>Trending Discussions</Text>
  </View>
);

export const Categories = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [endThreshholdReached, setEndThresholdReached] = useState(false);

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
        entering={FadeIn.delay(props.index * props.length)}
        style={{
          width: '100%',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{height: 200}}
          onPress={() =>
            navigation.navigate('Discussion', {selected: props.item})
          }>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            resizeMode="contain"
            source={props.item.poster}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                padding: 16,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'space-between',
                  width: '100%',
                }}>
                <Text style={styles.description}>#{props.item.title}</Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      name="people-outline"
                      size={Size - 4}
                      color={lightDark}
                    />

                    <Text
                      style={[
                        styles.description,
                        {
                          fontSize: 14,
                          marginLeft: 8,
                          fontFamily: 'Outfit-Bold',
                        },
                      ]}>
                      {props.item.activeMembers}/ {props.item.totalMembers}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={Size - 4}
                      color={lightDark}
                    />

                    <Text
                      style={[
                        styles.description,
                        {
                          fontSize: 14,
                          marginLeft: 8,
                          fontFamily: 'Outfit-Bold',
                        },
                      ]}>
                      {props.item.activeMembers - 20 * props.index}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={1}
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
                    fontSize: 18,
                    fontFamily: 'Outfit-Light',
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
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    height={Size - 6}
                    width={Size - 6}>
                    <Path
                      d="M23.25 37V24.75H11v-1.5h12.25V11h1.5v12.25H37v1.5H24.75V37Z"
                      fill={bgLight}
                    />
                  </Svg>
                </View>
              </TouchableOpacity>
            </View>
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
        width: '100%',
        paddingHorizontal: 16,
        alignSelf: 'center',
        paddingTop: 20,
        paddingBottom: offset,
      }}
      // getItemLayout={(length, index) => ({length, index})}
      refreshing={refreshing}
      onRefresh={async () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 5000);
      }}
      progressViewOffset={-offset}
      onEndReached={() => {
        setEndThresholdReached(true);
      }}
    />
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: deviceTypeAndroid === 'Handset' ? 20 : 27,
    fontFamily: 'Outfit-Regular',
    color: bgSecondary,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Outfit-Medium',
    color: lightDark,
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
