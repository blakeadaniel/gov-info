import React from "react";
import { styled } from "@shipt/react-native-tachyons";
import { TouchableOpacity, Text } from "react-native";
import { TEXT } from "../../constants/Text";

const ButtonContainer = styled(TouchableOpacity)`bg-lavender ba br2 aic pv2`;
const ButtonText = styled(Text, { fontSize: 18 })``;

interface PrimaryButtonProps {
  text: keyof typeof TEXT;
  style: any;
  onPress: () => void;
}

export function PrimaryButton({ text, style, onPress }: PrimaryButtonProps) {
  return (
    <ButtonContainer style={style} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}
