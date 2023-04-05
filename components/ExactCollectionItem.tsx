import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import { View, Text, TouchableOpacity } from 'react-native';
import { CollectionPackage } from '../types/types';
import { TEXT } from '../constants/Text';
import { Collection } from '../fetchers/types';
import { API_KEY } from '../constants/Key';
import { useNavigation } from '@react-navigation/core';

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

export function ExactCollectionItem({
  collectionPackage,
}: {
  collectionPackage: Collection;
}) {
  const [backupName, setBackupName] = React.useState<any>(undefined);
  const { goBack, navigate } = useNavigation();
  const backupTitle = React.useMemo(() => {
    if (!!collectionPackage.title) return;
    const query = collectionPackage.packageId.split('-')[1];
    const getBackupName = async (query: string) => {
      const formatter = (collectionPackage: CollectionPackage | Collection) => {
        const id = collectionPackage.packageId.split('-')[1];
        const billId = id.slice(5, id.length + 1);

        return `${billId}`;
      };
      try {
        const myTemplate = ({ query }: { query: string }) =>
          `https://api.propublica.org/congress/v1/bills/search.json?query=${formatter(
            collectionPackage
          )}`;
        const formattedWithTemplate = myTemplate({
          query,
        });
        const response = await fetch(formattedWithTemplate, {
          headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
        });
        const json = await response.json();
        setBackupName(json);
      } catch (error) {
        console.error(error);
      }
    };
    getBackupName(query);
  }, [collectionPackage]);

  const dateText = () => {
    return {
      dateIssued: `${TEXT.DATE_ISSUED} ${collectionPackage.dateIssued}`,
      lastModified: `${
        TEXT.LAST_MODIFIED
      } ${collectionPackage.lastModified.substring(0, 10)}`,
    };
  };

  const goToWebView = React.useCallback(() => {
    navigate('GovWebView', {
      source: collectionPackage.packageId,
      uri: backupName?.results?.[0]?.bills?.[0]?.govtrack_url ?? undefined,
    });
  }, [collectionPackage]);

  return (
    <ShadowContainer style={shadowStyle}>
      <Container onPress={goToWebView}>
        <CollectionTitle>
          {collectionPackage.title ??
            backupName?.results?.[0]?.bills?.[0]?.title ??
            ''}
        </CollectionTitle>
        <DateIssuedText>{dateText().dateIssued}</DateIssuedText>
        <LastModifiedDateText>{dateText().lastModified}</LastModifiedDateText>
      </Container>
    </ShadowContainer>
  );
}
