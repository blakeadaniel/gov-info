import React from 'react';
import { styled } from '@shipt/react-native-tachyons'
import { TouchableOpacity, Text } from 'react-native';
import { TEXT } from '../../constants/Text';

const ButtonContainer = styled(TouchableOpacity)`bg-lavender ba br2 aic pv2`;
const ButtonText = styled(Text, { fontSize: 18 })``;

interface PrimaryButtonProps {
    text: keyof typeof TEXT;
    style: any;
}

export function PrimaryButton({text, style}: PrimaryButtonProps) {

    return (
        <ButtonContainer style={style}>
            <ButtonText>{text}</ButtonText>
        </ButtonContainer>
    )
}