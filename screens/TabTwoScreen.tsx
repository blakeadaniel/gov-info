import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { SearchBar } from '../components/SearchBar';
import { TEXT } from '../constants/Text';
import { useSnapshot } from 'valtio';
import { billSearch, billSearchActions } from '../state/billState';
import { fetchBills } from '../fetchers/fetchBills';
import { ActivityIndicatorOverlay } from '../components/ActivityIndicatorOverlay';
import { Bill } from '../components/bills/Bill';
import { BillProps } from '../types/types';

const StyledSearchBar = styled(SearchBar)`wp85 asc mt3 pb2`;

export default function TabTwoScreen() {
  const [searchText, setSearchText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showBills, setShowBills] = React.useState(false);
  const billSearchData = useSnapshot(billSearch).data;

  const handleSubmitQuery = React.useCallback(() => {
    setIsLoading(true);
    setShowBills(false);
    billSearchActions.setBillSearchData(undefined);
    fetchBills(searchText);
  }, [searchText]);

  React.useEffect(() => {
    if (!!billSearchData?.results) {
      setIsLoading(false);
      setShowBills(true);
    }
  }, [billSearchData]);

  const mappedBills = React.useMemo(() => {
    return billSearchData?.results[0]?.bills?.map(
      (bill: BillProps, i: number) => {
        return <Bill bill={bill} key={i} />;
      }
    );
  }, [billSearchData]);

  return (
    <View style={styles.container}>
      <StyledSearchBar
        onSubmitEditing={handleSubmitQuery}
        text={searchText}
        setText={setSearchText}
        placeHolder={TEXT.SEARCH_BILLS}
      />
      {!billSearchData && !isLoading && (
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
      {isLoading && !showBills && (
        <ActivityIndicatorOverlay
          style={{ marginTop: 200 }}
          text={`Searching for Bills related to\n${searchText}...`}
        />
      )}
      {showBills && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {mappedBills}
        </ScrollView>
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
