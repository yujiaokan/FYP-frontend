import React from 'react';
import { Pressable, Text, TextStyle, PressableProps, StyleSheet } from 'react-native';
import{verticalScale,horizontalScale,scaleFontSize} from '../../theme/Scalling'
interface ConfirmButtonProps extends PressableProps {
  title: string;
  isDisabled?: boolean;
  onPress: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ title, isDisabled, onPress, ...props }) => {
  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        style.button,
        isDisabled && style.disabled,
        pressed && style.pressed, 
      ]}
      onPress={onPress}
      {...props}
    >
      <Text style={style.title as TextStyle}>{title}</Text>
    </Pressable>
  );
};
const style = StyleSheet.create({
  button: {
    backgroundColor: '#2979F2',
    height: verticalScale(55),
    justifyContent: 'center',
    borderRadius: horizontalScale(50),
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    lineHeight: scaleFontSize(19),
    color: '#FFFFFF',
    textAlign: 'center',
  },

  pressed: {
    opacity: 0.5, 
  backgroundColor: '#ddd', 
  },
});

export default ConfirmButton;
