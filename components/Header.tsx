import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import { Pressable, Text, View } from 'react-native';

const HeaderContainer = styled(View, { paddingTop: 45 })`flx-row pb1`;
const BackArrow = styled(Pressable)`ml2`;
const HeaderText = styled(Text, { fontSize: 18 })`asc tc wp90`;

interface HeaderProps {
  text?: string;
  hideBackArrow?: boolean;
  onPress?: () => void;
}

export function Header({ text, hideBackArrow, onPress }: HeaderProps) {
  return (
    <HeaderContainer>
      {!hideBackArrow && (
        <BackArrow onPress={onPress}>
          <FontAwesome name='chevron-left' size={25} color={'#2e2e2e'} />
        </BackArrow>
      )}
      {text && <HeaderText numberOfLines={1}>{text}</HeaderText>}
    </HeaderContainer>
  );
}
