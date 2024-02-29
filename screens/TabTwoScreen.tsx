import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { SearchBar } from '../components/SearchBar';
import { TEXT } from '../constants/Text';
import { useSnapshot } from 'valtio';
import { billSearch, billSearchActions } from '../state/billState';
import { fetchSearch, useSearchQuery } from '../fetchers/fetchBills';
import { ActivityIndicatorOverlay } from '../components/ActivityIndicatorOverlay';
import { Bill } from '../components/bills/Bill';
import { BillProps } from '../types/types';
import { RootTabScreenProps } from '../types';
import { queryClient } from '../store/queryClient';
import { BillsResults } from '../components/bills/BillsResults';

const StyledSearchBar = styled(SearchBar)`wp85 asc mt3 pb2`;

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'BillSearch'>) {
  const [searchText, setSearchText] = React.useState('');
  const [queryText, setQueryText] = React.useState('');
  const [showBills, setShowBills] = React.useState(false);

  const handleSubmitQuery = React.useCallback(async () => {
    setQueryText(searchText);
    setShowBills(true);
  }, [searchText]);

  useEffect(() => {
    if (showBills && searchText !== queryText) {
      setShowBills(false);
    }
  }, [showBills, searchText, queryText]);

  return (
    <View style={styles.container}>
      <StyledSearchBar
        onSubmitEditing={handleSubmitQuery}
        text={searchText}
        setText={setSearchText}
        placeHolder={TEXT.SEARCH_BILLS}
      />
      {!showBills && (
        <>
          <Image
            source={require('../assets/images/search.png')}
            style={{
              width: 250,
              height: 250,
              alignSelf: 'center',
              marginTop: 150,
            }}
          />
          <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20 }}>
            {TEXT.SEARCH_BILLS}
          </Text>
        </>
      )}
      {!!showBills && (
        <BillsResults searchText={queryText} showBills={showBills} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
