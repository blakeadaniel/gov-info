import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, ScrollView } from 'react-native';
import { getDateTime, oneWeekAgo } from '../utils/getDateTime';
import { ActivityIndicatorOverlay } from '../components/ActivityIndicatorOverlay';
import { ExactCollectionItem } from '../components/ExactCollectionItem';
import { CollectionPackage } from '../types/types';
import { TEXT } from '../constants/Text';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { fetchCollections } from '../fetchers/fetchCollection';
import { useSnapshot } from 'valtio';
import { collectionState } from '../state/collectionState';
import { Header } from '../components/Header';
import { useExactCollectionsQuery } from '../hooks/useCollectionSearch';
import { useNavigation } from '@react-navigation/core';

const Page = styled(View)`flx-i bg-white`;
const StyledLinearGradient = styled(LinearGradient)`h2`;
const StyledActivityIndicatorOverlay = styled(ActivityIndicatorOverlay)`mt7`;
const StyledScrollView = styled(ScrollView)`mb4 pt1`;
const NoResultsText = styled(Text, { fontSize: 30 })`bold asc mt7`;
const StyledPrimaryButton = styled(PrimaryButton)`mh4 mt3`;

type SingleCollectionScreenProps = {
  route: {
    params: {
      collectionCode: string;
      collectionName: string;
      navigation: any;
    };
  };
};

export function SingleCollectionScreen({ route }: SingleCollectionScreenProps) {
  const { goBack } = useNavigation();
  const collectionCode = route?.params?.collectionCode;
  const collectionName = route?.params?.collectionName;

  const {
    data: exactCollection,
    isLoading,
    isFetching,
  } = useExactCollectionsQuery({
    collectionCode: collectionCode,
    lastModifiedStartDate: oneWeekAgo(),
    pageSize: 100,
    offsetMark: '%2A',
  });
  const gatheringData = isLoading || isFetching;

  const renderCollectionItems = exactCollection?.key?.packages?.map(
    (collectionPackage: CollectionPackage, i: number) => {
      return (
        <ExactCollectionItem
          collectionPackage={collectionPackage}
          key={i}
          route={route}
        />
      );
    }
  );

  const gradientColors = ['#ffffff', '#e8e8e8', '#d4d4d4'];

  const onGoBack = React.useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Page>
      <Header text={collectionName ?? ''} onPress={onGoBack} />
      <StyledLinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      {gatheringData && (
        <StyledActivityIndicatorOverlay text={`Getting ${collectionName}...`} />
      )}
      {exactCollection?.key?.packages?.length === 0 && !gatheringData && (
        <>
          <NoResultsText>{TEXT.NO_RESULTS_FOUND}</NoResultsText>
          <StyledPrimaryButton text={TEXT.GO_BACK} onPress={goBack} />
        </>
      )}
      {!gatheringData && exactCollection?.key?.packages?.length > 0 && (
        <StyledScrollView showsVerticalScrollIndicator={false}>
          {renderCollectionItems}
        </StyledScrollView>
      )}
    </Page>
  );
}
