import {Text} from 'react-native';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {bgLight, colorSuccess} from '../utils/colors';

export const RenderSuccess = ({success}) => {
  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 100,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorSuccess,
      }}>
      <Text style={{color: bgLight, fontFamily: 'Outfit-Light', fontSize: 18}}>
        {success}
      </Text>
    </Animated.View>
  );
};
