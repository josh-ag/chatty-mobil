import {Text} from 'react-native';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {bgLight, colorGoogle} from '../utils/colors';

export const RenderError = ({error}) => {
  return (
    <Animated.View
      entering={SlideInDown.duration(700)}
      exiting={SlideOutDown.duration(700)}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 100,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorGoogle,
      }}>
      <Text style={{color: bgLight, fontFamily: 'Outfit-Light', fontSize: 18}}>
        {error}
      </Text>
    </Animated.View>
  );
};
