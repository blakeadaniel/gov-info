import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { SectionOption } from '../components/SectionOption';
import { View } from '../components/Themed';
import { useCollectionsQuery } from '../hooks/useSearch';
import { RootTabScreenProps } from '../types';
import { styled } from '@shipt/react-native-tachyons';
import { ActivityIndicatorOverlay } from '../components/ActivityIndicatorOverlay';
import { TEXT } from '../constants/Text';
import { collectionDataActions } from '../state/collectionState';
import { NoResultsFound } from '../components/NoResultsFound';

const loadingGif = require('../assets/gifs/falling-books.gif');

const StyledSearchBar = styled(SearchBar)`ph4 mb3 mt2`;
const StyledScrollView = styled(ScrollView)`mb5`;
const StyledSectionOption = styled(SectionOption)`ph3 mb2`;
const StyledActivityIndicatorOverlay = styled(ActivityIndicatorOverlay)`mt6`;

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [searchText, setSearchText] = React.useState('');
  const [showCollections, setShowCollections] = React.useState(false);
  const { data: mainCollections, isLoading: isLoading } =
    useCollectionsQuery('collections');

  const resetData = () => {
    collectionDataActions.setCollectionData({});
  };

  resetData();

  React.useEffect(() => {
    collectionDataActions.setCollectionData({});
    if (!!mainCollections?.key?.collections) {
      setShowCollections(true);
    }
  }, [mainCollections]);

  const getFilteredMainCollections = React.useMemo(() => {
    return mainCollections?.key?.collections.map((x: any, _: number) => {
      if (x?.collectionName?.toLowerCase().includes(searchText.toLowerCase()))
        return x;
    });
  }, [searchText, showCollections]);

  const lengthOfResults = !!getFilteredMainCollections
    ? Object.values(getFilteredMainCollections).filter((x) => x != undefined)
        .length
    : 1;

  const collectionItems = getFilteredMainCollections?.map(
    (x: any, i: number) => {
      if (!!x?.collectionName) {
        return (
          <StyledSectionOption
            optionTitle={x.collectionName}
            key={i}
            onPress={() =>
              navigation.navigate('SingleCollectionScreen', {
                collectionCode: x.collectionCode,
                collectionName: x.collectionName,
                navigation: navigation,
              })
            }
          />
        );
      }
    }
  );

  const loadingAnimation = (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
      }}
    >
      <Image style={{ height: 350, width: 350 }} source={loadingGif} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <StyledSearchBar text={searchText} setText={setSearchText} />
        <StyledScrollView showsVerticalScrollIndicator={false}>
          {isLoading && loadingAnimation}
          {showCollections && collectionItems}
          {lengthOfResults === 0 && (
            <NoResultsFound text={TEXT.NO_RESULTS_FOUND} />
          )}
        </StyledScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  searchBarContainer: {
    width: '100%',
  },
});
