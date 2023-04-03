import React from 'react';
import { Image, ImageProps, View, Text as RNText } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { useWindowDimensions } from 'react-native';
import { TEXT } from '../constants/Text';
import { stringFormat } from '../utils/stringFormat';

const noResultsImage = require('../assets/images/no-results-found.png');

const Container = styled(View)`aic`;
const TextContainer = styled(View)`asc`;
const Text = styled(RNText, { fontSize: 18, fontWeight: '500' })`tc`;

type NoResultsFoundProps = {
  source?: ImageProps;
  text?: string;
  size?: number;
};

export function NoResultsFound({ source, text, size }: NoResultsFoundProps) {
  const [showText, setShowText] = React.useState(false);
  const { width } = useWindowDimensions();
  const imageDims = size ? size : width / 1.25;

  return (
    <Container>
      <Image
        source={source ? source : noResultsImage}
        style={{ width: imageDims, height: imageDims }}
        onLoadEnd={() => setShowText(true)}
        onError={(e) => console.log(`Could not load image - ${e}`)}
      />
      {text && showText && (
        <TextContainer>
          <Text>{stringFormat(TEXT.NO_RESULTS_FOUND_FOR, text)}</Text>
        </TextContainer>
      )}
    </Container>
  );
}
