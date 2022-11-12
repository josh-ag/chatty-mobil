import {Text} from 'react-native';

//custom text component
export const MyAppText = ({children, style}) => {
  return (
    <Text style={[{fontFamily: 'Outfit-Regular'}, style]}>{children}</Text>
  );
};
