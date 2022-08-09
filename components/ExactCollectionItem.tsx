import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { ExactCollectionItemProps } from '../types/types';
import { TEXT } from '../constants/Text';
import { useNavigation } from '@react-navigation/core';
import { WebViewSource } from 'react-native-webview/lib/WebViewTypes';

const shadowStyle = {
  backgroundColor: '#ffffff',
  shadowOpacity: 1,
  shadowColor: '#9a949e',
  shadowRadius: 2,
  elevation: 2,
  shadowOffset: { width: 0, height: 0 },
};

const ShadowContainer = styled(View)`br2 mv2 mh2`;
const Container = styled(TouchableOpacity)`ba pa1 br2 bg-lavender`;
const CollectionTitle = styled(Text)`mb2 bold`;
const DateIssuedText = styled(Text)`pb1`;
const LastModifiedDateText = styled(Text)``;

export function ExactCollectionItem({ collectionPackage, route }: any) {
  const dateText = () => {
    return {
      dateIssued: `${TEXT.DATE_ISSUED} ${collectionPackage.dateIssued}`,
      lastModified: `${
        TEXT.LAST_MODIFIED
      } ${collectionPackage.lastModified.substring(0, 10)}`,
    };
  };

  const goToWebView = React.useCallback(() => {
    route.params.navigation.push('GovWebView', {
      source: collectionPackage.packageId,
      goBack: route.params.navigation.goBack,
    });
  }, [collectionPackage]);

  return (
    <ShadowContainer style={shadowStyle}>
      <Container onPress={goToWebView}>
        <CollectionTitle>{collectionPackage.title}</CollectionTitle>
        <DateIssuedText>{dateText().dateIssued}</DateIssuedText>
        <LastModifiedDateText>{dateText().lastModified}</LastModifiedDateText>
      </Container>
    </ShadowContainer>
  );
}
