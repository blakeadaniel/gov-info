import React from "react";
import { SafeAreaView, TextInput as RNTextInput } from "react-native";
import { TEXT } from "../constants/Text";

const textInputStyles = {
    input: {
      height: 40,
      width: '100%',
      borderWidth: 1,
      padding: 10,
      borderRadius: 8
    },
  };

type TextInputProps = {
    onChangeValue: any;
    text: string;
    placeHolder?: string;
}

export function TextInput({onChangeValue, text, placeHolder = TEXT.MAIN_SEARCH_PLACEHOLDER}: TextInputProps) {

  return (
    <SafeAreaView>
      <RNTextInput
        style={textInputStyles.input}
        onChangeText={onChangeValue}
        value={text}
        clearTextOnFocus
        placeholder={placeHolder}
        clearButtonMode={'while-editing'}
        autoCapitalize={'sentences'}
        // onFocus={clearText}
      />
    </SafeAreaView>
  );
};