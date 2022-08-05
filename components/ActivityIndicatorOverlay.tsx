import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { styled } from "@shipt/react-native-tachyons";

const Container = styled(View)`bg-grey wp50 asc h6 jcc aic br3`;
const ActivityIndicatorText = styled(Text)`mt3 lightcyan tc`;

type ActivityIndicatorOverlayProps = {
  style?: StyleProp<ViewStyle>;
  text?: string;
};

export function ActivityIndicatorOverlay({
  style,
  text,
}: ActivityIndicatorOverlayProps) {
  return (
    <Container style={style}>
      <ActivityIndicator size="large" color="#e0ffff" />
      {text && <ActivityIndicatorText>{text}</ActivityIndicatorText>}
    </Container>
  );
}
