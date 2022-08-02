import React from 'react';
import { styled } from '@shipt/react-native-tachyons'
import { Text, Touchable, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { TEXT } from '../constants/Text';

const StyledTouchable = styled(TouchableOpacity)``;
const StyledText = styled(Text)``;

type TextButtonProps = {
    text: string;
    style?: StyleProp<ViewStyle>;
}

export function TextButton({ text, style }: TextButtonProps) {

    return (
        <StyledTouchable style={style}>
            <StyledText>{text}</StyledText>
        </StyledTouchable>
    )
}