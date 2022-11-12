import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {
  lightDark,
  bgSecondary,
  Size,
  bgPrimary,
  bgLight,
  offset,
} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export const MessageScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: bgLight}}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          onPress={() => setMessage(false)}
          style={{
            backgroundColor: bgSecondary,
            zIndex: 200,
            flex: 1,
            paddingHorizontal: 16,
            paddingTop: offset,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            // style={{alignSelf: 'flex-end'}}
            onPress={navigation.goBack}>
            <Ionicons name="close" size={Size * 1.2} color={bgPrimary} />
          </TouchableOpacity>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Ionicons
              name="alert-circle-outline"
              size={Size}
              color={lightDark}
            />
            <Text style={styles.titleMd}>All Notification Cleared</Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  titleMd: {
    fontFamily: 'Outfit-Light',
    fontSize: 18,
    color: lightDark,
    marginTop: 16,
  },
});
