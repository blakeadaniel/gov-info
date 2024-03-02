import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useHouseVotesQuery,
  useSenateVotesQuery,
} from '../hooks/useCurrentVotes';
import { TabViewPage } from '../components/TabViewPage';
import { ChamberVotes } from '../components/glance-votes/ChamberVotes';

export function TabThreeScreen() {
  const {
    data: houseVotesQuery,
    isLoading: isHouseLoading,
    isFetching: isHouseFetching,
  } = useHouseVotesQuery();
  const {
    data: senateVotesQuery,
    isLoading: isSenateLoading,
    isFetching: isSenateFetching,
  } = useSenateVotesQuery();

  return (
    <View style={styles.container}>
      <TabViewPage>
        {
          <ChamberVotes
            data={houseVotesQuery}
            isLoading={isHouseLoading || isHouseFetching}
          />
        }
        {
          <ChamberVotes
            data={senateVotesQuery}
            isLoading={isSenateLoading || isSenateFetching}
          />
        }
      </TabViewPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
