import React from "react";
import { SafeAreaView, Text, TextInput as RNTextInput, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { TEXT } from '../constants/Text';
import { TextButton } from './TextButton';
import { styled } from '@shipt/react-native-tachyons'

const Input = styled(RNTextInput, { height: 40 })`wp100 ba br4 ph3`;
const StyledTextButton = styled(TextButton)`ml2`;

type TextInputProps = {
    onChangeValue: any;
    text: string;
    placeHolder?: string;
    blur?: boolean;
    style?: StyleProp<ViewStyle>;
    cancelButton?: boolean;
}

export function TextInput({onChangeValue, text, placeHolder = TEXT.MAIN_SEARCH_PLACEHOLDER, blur, style, cancelButton}: TextInputProps) {

  return (
    <SafeAreaView style={style}>
      <Input
      // ref={textInputRef}
      //   onFocus={setFocus}
        // onBlur={}
        onChangeText={onChangeValue}
        value={text}
        clearTextOnFocus
        placeholder={placeHolder}
        clearButtonMode={'while-editing'}
        autoCapitalize={'sentences'}
        autoCorrect={true}
      />
    </SafeAreaView>
  );
};