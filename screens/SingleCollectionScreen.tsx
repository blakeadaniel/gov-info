import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, ScrollView } from 'react-native';
import { getDateTime } from '../utils/getDateTime';
import { useExactCollectionsQuery } from '../hooks/useCollectionSearch';
import { ActivityIndicatorOverlay } from '../components/ActivityIndicatorOverlay';
import { ExactCollectionItem } from '../components/ExactCollectionItem';
import { CollectionPackage } from '../types/types';

const Page = styled(View)`flx-i bg-white`;
const Header = styled(Text, { fontSize: 20 })`asc mt3 mb2`;
const StyledLinearGradient = styled(LinearGradient)`h2`;
const StyledActivityIndicatorOverlay = styled(ActivityIndicatorOverlay)`mt7`;
const StyledScrollView = styled(ScrollView)`mb4 mt1`;

type SingleCollectionScreenProps = {
    route: {
        params: {
            collectionCode: string;
            collectionName: string;
        }
    }
}

export function SingleCollectionScreen({ route }: SingleCollectionScreenProps) {
    const collectionCode = route?.params?.collectionCode;
    const collectionName = route?.params?.collectionName;
    const [showCollections, setShowCollections] = React.useState(false);
    const {data: exactCollection, isLoading: isLoading} = useExactCollectionsQuery({collectionCode: collectionCode, lastModifiedStartDate: getDateTime(), pageSize: 10});

    console.log(exactCollection)
  
    React.useEffect(() => {
      if (!!exactCollection?.key) {
        setShowCollections(true)
      }
    }, [exactCollection]);

    const renderCollectionItems = (
        exactCollection?.key?.packages?.map((collectionPackage: CollectionPackage, i: number) => {
            return <ExactCollectionItem collectionPackage={collectionPackage} key={i}/>
        }));

    const gradientColors = ['#ffffff', '#e8e8e8', '#d4d4d4'];

    return (
        <Page>
            <Header>{collectionName ?? ''}</Header>
            <StyledLinearGradient colors={gradientColors} start={{x: 0, y: 0}} end={{x: 0, y: 1}}/>
            {isLoading && <StyledActivityIndicatorOverlay text={`Getting ${collectionName}...`}/>}
            <StyledScrollView>
            {showCollections && renderCollectionItems}
            </StyledScrollView>
        </Page>
    )
}