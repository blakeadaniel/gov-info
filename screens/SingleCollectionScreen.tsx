import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, ScrollView } from 'react-native';
import { getDateTime } from '../utils/getDateTime';
import { useExactCollectionsQuery } from '../hooks/useCollectionSearch';
import { ActivityIndicatorOverlay } from '../components/ActivityIndicatorOverlay';
import { ExactCollectionItem } from '../components/ExactCollectionItem';
import { CollectionPackage } from '../types/types';
import { TEXT } from '../constants/Text';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { fetchCollections } from '../fetchers/fetchCollection';
import { queryClient } from '../store/queryClient';
import { QUERIES } from '../constants/Queries';
import { useSnapshot } from 'valtio';
import { collectionState } from '../state/collectionState';
import { Header } from '../components/Header';

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
  const collectionCode = route?.params?.collectionCode;
  const collectionName = route?.params?.collectionName;
  const exactCollection = useSnapshot(collectionState).data;
  console.log('exactCollection', exactCollection);
  const [showCollections, setShowCollections] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const collection = async () =>
    await fetchCollections({
      collectionCode: collectionCode,
      lastModifiedStartDate: getDateTime(),
      pageSize: 100,
    });

  React.useEffect(() => {
    collection();
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (!!exactCollection?.packages) {
      setShowCollections(true);
    }
  }, [exactCollection]);

  const renderCollectionItems = exactCollection?.packages?.map(
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

  const goBack = React.useCallback(() => {
    route.params.navigation.goBack();
  }, []);

  return (
    <Page>
      <Header text={collectionName ?? ''} onPress={goBack} />
      <StyledLinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      {isLoading && (
        <StyledActivityIndicatorOverlay text={`Getting ${collectionName}...`} />
      )}
      {exactCollection?.packages?.length === 0 && !isLoading && (
        <>
          <NoResultsText>{TEXT.NO_RESULTS_FOUND}</NoResultsText>
          <StyledPrimaryButton text={TEXT.GO_BACK} onPress={goBack} />
        </>
      )}
      {!isLoading && (
        <StyledScrollView showsVerticalScrollIndicator={false}>
          {showCollections && renderCollectionItems}
        </StyledScrollView>
      )}
    </Page>
  );
}
