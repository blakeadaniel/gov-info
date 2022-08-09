import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { TextInput } from './TextInput';

const Container = styled(View)`wp100 flx-row aic`;
const StyledTextInput = styled(TextInput)`wp100 flx-row aic`;

type SearchBarProps = {
  style?: StyleProp<ViewStyle>;
  text?: string;
  setText: Dispatch<SetStateAction<string>>;
  placeHolder?: string;
  onSubmitEditing?: () => void;
};

export function SearchBar({
  style,
  text,
  setText,
  placeHolder,
  onSubmitEditing,
}: SearchBarProps) {
  const onChangeText = React.useCallback(
    (text) => setText(text.replace('’', "'")),
    [setText]
  );

  return (
    <Container style={style}>
      <StyledTextInput
        text={text}
        onChangeValue={onChangeText}
        cancelButton={true}
        placeHolder={placeHolder}
        onSubmitEditing={onSubmitEditing}
      />
    </Container>
  );
}
