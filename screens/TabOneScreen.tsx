import React, { useMemo, useState } from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootTabScreenProps } from '../types';
import { styled } from '@shipt/react-native-tachyons';
import { DatePicker } from '../components/date-picker/DatePicker';
import { Accordion } from '../components/accordion/Accordion';
import { fetchVotesByChamberAndDate } from '../fetchers/fetchVotes';
import { VotesComponent } from '../components/votes/Votes';
import { LineDivider } from '../components/LineDivider';

const loadingGif = require('../assets/gifs/falling-books.gif');

const ChamberContainer = styled(View)`wp80 asc flx-row jcsa mb2`;
const StyledPressable = styled(Pressable)`bg-lightgray br4 pv2 ph3 mv1 aic jcc`;
const StyledSearchButton = styled(
  Pressable
)`bg-lightblue br2 pv2 ph3 mv1 aic jcc`;

type SearchData = {
  num_results?: number;
  votes?: [];
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'DateSearch'>) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [chamber, setChamber] = useState<string>('house');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [searchData, setSearchData] = useState<SearchData>();
  const [hasSearched, setHasSearched] = useState<boolean>(false);

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

  const onSearch = async () => {
    setHasSearched(true);
    setIsLoading(true);
    try {
      const data = await fetchVotesByChamberAndDate(
        chamber,
        String(startDate?.toISOString())?.split('T')[0],
        String(endDate?.toISOString())?.split('T')[0]
      );
      setSearchData(data.results);
      console.log(data.results);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const body = useMemo(() => {
    const renderItem = ({ item, index }: { item: any; index: number }) => {
      return <VotesComponent vote={item} key={index} />;
    };
    if (!hasSearched) {
      return (
        <>
          <Image
            source={require('../assets/images/calendar.jpg')}
            style={{
              width: 340,
              height: 265,
              alignSelf: 'center',
              marginTop: 150,
            }}
          />
          <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20 }}>
            {`Search for votes by date(s)`}
          </Text>
        </>
      );
    }
    if (isLoading) {
      return <ActivityIndicator size='large' style={{ marginTop: 100 }} />;
    }
    if (searchData?.num_results === 0) {
      return (
        <Text style={{ fontSize: 20, marginTop: 100 }}>
          No results found...
        </Text>
      );
    }
    if (!!searchData?.num_results && searchData.num_results > 0) {
      return (
        <FlatList
          data={searchData.votes}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  }, [isLoading, searchData, hasSearched]);

  return (
    <View style={styles.container}>
      <Accordion
        headerText={'Date range'}
        children={
          <DateTimePicker
            mode='range'
            startDate={startDate}
            endDate={endDate}
            onChange={({ startDate, endDate }: any) => {
              setStartDate(startDate), setEndDate(endDate);
            }}
          />
        }
      />
      <ChamberContainer>
        <StyledPressable
          onPress={() => setChamber('house')}
          style={{ borderWidth: chamber === 'house' ? 2 : 0 }}
        >
          <Text style={{ fontSize: 16 }}>House</Text>
        </StyledPressable>
        <StyledPressable
          onPress={() => setChamber('senate')}
          style={{ borderWidth: chamber === 'senate' ? 2 : 0 }}
        >
          <Text style={{ fontSize: 16 }}>Senate</Text>
        </StyledPressable>
        <StyledSearchButton onPress={onSearch}>
          <Text style={{ fontSize: 16 }}>Search</Text>
        </StyledSearchButton>
      </ChamberContainer>
      <View
        style={{ backgroundColor: '#00000050', height: 2, width: '100%' }}
      />
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: 'white',
  },
});
