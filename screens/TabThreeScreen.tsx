import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Platform,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import {
  useBothVotesQuery,
  useHouseVotesQuery,
  useSenateVotesQuery,
} from '../hooks/useCurrentVotes';
import { BothVotesProps } from '../fetchers/types';
import { VotesComponent } from '../components/votes/Votes';
import { TEXT } from '../constants/Text';
import { Accordion } from '../components/accordion/Accordion';
import { ActivityIndicatorOverlay } from '../components/ActivityIndicatorOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Svg, { Path } from 'react-native-svg';
import { TabViewPage } from '../components/TabViewPage';
import { ChamberVotes } from '../components/glance-votes/ChamberVotes';

const Header = styled(View, {
  backgroundColor: '#7f66b3',
})`pv2 ph2 o-80 flx-row jcsb`;
const HeaderLeft = styled(TouchableOpacity)`hp100 wp30`;
const HeaderRight = styled(View)`hp100 wp30`;
const StyledSVG = styled(Svg, { height: 20, width: 24 })``;
const HeaderText = styled(Text, { fontSize: 20 })`bold asc`;
const StyledActivityIndicatorOverlay = styled(ActivityIndicatorOverlay)`mt5`;

const arrow =
  'M1.57815 11.62C1.62815 11.5 1.69815 11.39 1.79815 11.29L7.08815 5.99999C7.47815 5.60999 8.10815 5.60999 8.49815 5.99999C8.88815 6.38999 8.88815 7.01999 8.49815 7.40999L4.90815 11H21.4981C22.0481 11 22.4981 11.45 22.4981 12C22.4981 12.55 22.0481 13 21.4981 13H4.90815L8.49815 16.59C8.88815 16.98 8.88815 17.61 8.49815 18C8.10815 18.39 7.47815 18.39 7.08815 18L1.78815 12.71C1.69815 12.62 1.61815 12.51 1.56815 12.39C1.47815 12.14 1.47815 11.87 1.57815 11.62Z';
const arrowSVG = (
  <StyledSVG>
    <Path stroke='rgb(0, 0, 0)' strokeWidth={2} fill='none' d={arrow} />
  </StyledSVG>
);

export function TabThreeScreen() {
  const {
    data: bothVotesQuery,
    isLoading: isBothLoading,
    isFetching: isBothFetching,
  } = useBothVotesQuery();
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
            data={bothVotesQuery}
            isLoading={isBothLoading || isBothFetching}
          />
        }
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
