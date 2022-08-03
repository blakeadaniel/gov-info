import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import { View, Text } from 'react-native';
import { ExactCollectionItemProps } from '../types/types';
import { TEXT } from '../constants/Text';

const shadowStyle = {
    backgroundColor: '#ffffff',
    shadowOpacity: 1,
    shadowColor: '#9a949e',
    shadowRadius: 2,
    elevation: 2,
    shadowOffset: { width: 0, height: 0 }
}

const ShadowContainer = styled(View)`br2 mv2 mh2`;
const Container = styled(View)`ba pa1 br2 bg-lavender`;
const CollectionTitle = styled(Text)`mb2 bold`;
const DateIssuedText = styled(Text)`pb1`;
const LastModifiedDateText = styled(Text)``;

export function ExactCollectionItem({collectionPackage}: ExactCollectionItemProps) {
    const dateText = () => { return {
        dateIssued: `${TEXT.DATE_ISSUED} ${collectionPackage.dateIssued}`,
        lastModified: `${TEXT.LAST_MODIFIED} ${collectionPackage.lastModified.substring(0, 10)}`
    }}

    return (
        <ShadowContainer style={shadowStyle}>
        <Container>
            <CollectionTitle>{collectionPackage.title}</CollectionTitle>
            <DateIssuedText>{dateText().dateIssued}</DateIssuedText>
            <LastModifiedDateText>{dateText().lastModified}</LastModifiedDateText>
        </Container>
        </ShadowContainer>
    )
}