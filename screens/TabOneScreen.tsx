import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { SectionOption } from '../components/SectionOption';
import { View } from '../components/Themed';
import { useCollectionsQuery } from '../hooks/useSearch';
import { RootTabScreenProps } from '../types';
import { styled } from '@shipt/react-native-tachyons';
import { ActivityIndicatorOverlay } from '../components/ActivityIndicatorOverlay';
import { TEXT } from '../constants/Text';
import { collectionDataActions } from '../state/collectionState';

const StyledSearchBar = styled(SearchBar)`ph4 mb3 mt2`;
const StyledScrollView = styled(ScrollView)`mb5`;
const StyledSectionOption = styled(SectionOption)`ph3 mb2`;
const StyledActivityIndicatorOverlay = styled(ActivityIndicatorOverlay)`mt7`;

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

  // React.useEffect(() => {
  //   collectionDataActions.setCollectionData({});
  // }, []);

  React.useEffect(() => {
    collectionDataActions.setCollectionData({});
    if (!!mainCollections?.key) {
      setShowCollections(true);
    }
  }, [mainCollections]);

  const getFilteredMainCollections = React.useMemo(() => {
    return mainCollections?.key?.map((x: any, _: any) => {
      if (x?.collectionName?.includes(searchText)) return x;
    });
  }, [searchText, showCollections]);

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

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <StyledSearchBar text={searchText} setText={setSearchText} />
        <StyledScrollView>
          {isLoading && (
            <StyledActivityIndicatorOverlay
              text={TEXT.GETTING_MAIN_COLLECTIONS}
            />
          )}
          {showCollections && collectionItems}
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
