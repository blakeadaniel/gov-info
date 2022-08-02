import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { SectionOption } from '../components/SectionOption';
import { Text, View } from '../components/Themed';
import { EXAMPLE } from '../constants/Key';
import { useCollectionsQuery } from '../hooks/useSearch';
import { RootTabScreenProps } from '../types';
import { styled } from '@shipt/react-native-tachyons'
import { queryClient } from '../store/queryClient';
import { QUERIES } from '../constants/Queries';
import { ActivityIndicatorOverlay } from '../components/ActivityIndicatorOverlay';
import { TEXT } from '../constants/Text';
import { useExactCollectionsQuery } from '../hooks/useCollectionSearch';
import { getDateTime } from '../utils/getDateTime';

const StyledSearchBar = styled(SearchBar)`ph4 mb3 mt2`;
const StyledScrollView = styled(ScrollView)`mb5`;
const StyledSectionOption = styled(SectionOption)`ph3 mb2`;
const StyledActivityIndicatorOverlay = styled(ActivityIndicatorOverlay)`mt7`;

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [showCollections, setShowCollections] = React.useState(false);
  const {data: mainCollections, isLoading: isLoading} = useCollectionsQuery('collections');

  const thing = useExactCollectionsQuery({collectionCode: 'BILLS', lastModifiedStartDate: '2022-01-28T15%3A18%3A10Z', pageSize: 5});

  console.log('thing', thing?.data)

  React.useEffect(() => {
    if (!!mainCollections?.key) {
      setShowCollections(true)
    }
  }, [mainCollections]);

  const collectionItems = (
    mainCollections?.key?.map((x: any, i: number) => {
      return <StyledSectionOption optionTitle={x.collectionName} key={i}/>
    })
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
      <StyledSearchBar/>
        <StyledScrollView>
      {isLoading && <StyledActivityIndicatorOverlay text={TEXT.GETTING_MAIN_COLLECTIONS}/>}
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
    paddingTop: 10
  },
  searchBarContainer: {
    width: '100%'
  }
});
