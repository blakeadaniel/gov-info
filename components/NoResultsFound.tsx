import React from 'react';
import { Image, ImageProps, View, Text as RNText } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';

const noResultsImage = require('../assets/images/no-results-found.png');

const Container = styled(View)`aic`;
const TextContainer = styled(View)`asc`;
const Text = styled(RNText, { fontSize: 18 })``;

type NoResultsFoundProps = {
  source?: ImageProps;
  text?: string;
  size?: number;
};

export function NoResultsFound({ source, text, size }: NoResultsFoundProps) {
  const [showText, setShowText] = React.useState(false);
  const SIZE = size ? size : 400;

  return (
    <Container>
      <Image
        source={source ? source : noResultsImage}
        style={{ width: SIZE, height: SIZE }}
        onLoadEnd={() => setShowText(true)}
        onError={(e) => console.log(`Could not load image - ${e}`)}
      />
      {text && showText && (
        <TextContainer>
          <Text>{text}</Text>
        </TextContainer>
      )}
    </Container>
  );
}
