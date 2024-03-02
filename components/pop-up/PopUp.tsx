import React from 'react';
import {
  Pressable,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { useNavigation } from '@react-navigation/native';

const Container = styled(View, {
  backgroundColor: '#00000050',
})`bg-black flx-i jcc aic`;
const InnerContainer = styled(View)`bg-white br2 ph3 pv4 max-wp70 aic`;
const StyledPressable = styled(TouchableOpacity)`bg-black aic br4 mt4 pv1 ph3`;
const PressableText = styled(Text, {
  fontSize: 16,
  textAlign: 'center',
})`white pv1`;

export function PopUp({
  route,
}: {
  route: {
    params: {
      text: string;
    };
  };
}) {
  const { goBack } = useNavigation();

  const onGoBack = async () => {
    await setTimeout(goBack, 200);
  };

  return (
    <Container>
      <InnerContainer>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          {route.params.text}
        </Text>
        <StyledPressable onPress={onGoBack} activeOpacity={0.5}>
          <PressableText>Okay</PressableText>
        </StyledPressable>
      </InnerContainer>
    </Container>
  );
}
