import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
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

const Header = styled(View)`bg-mediumpurple aic pv2`;
const HeaderText = styled(Text, { fontSize: 20 })`bold`;
const StyledActivityIndicatorOverlay = styled(ActivityIndicatorOverlay)`mt5`;

export default function ModalScreen() {
  const { data: bothVotesQuery, isLoading: isBothLoading } =
    useBothVotesQuery();
  const { data: houseVotesQuery, isLoading: isHouseLoading } =
    useHouseVotesQuery();
  const { data: senateVotesQuery, isLoading: isSenateLoading } =
    useSenateVotesQuery();

  return (
    <View style={styles.container}>
      <Header>
        <HeaderText>{TEXT.VOTES}</HeaderText>
      </Header>
      <Accordion
        svStyle={{ marginBottom: 160 }}
        headerText={TEXT.BOTH}
        children={
          isBothLoading ? (
            <StyledActivityIndicatorOverlay text={TEXT.GETTING_BOTH_VOTES} />
          ) : (
            bothVotesQuery?.key?.results.votes?.map(
              (x: BothVotesProps, i: number) => {
                return <VotesComponent vote={x} key={i} />;
              }
            )
          )
        }
        withScroll={true}
      />
      <Accordion
        svStyle={{ marginBottom: 200 }}
        headerText={TEXT.HOUSE}
        children={
          isHouseLoading ? (
            <StyledActivityIndicatorOverlay text={TEXT.GETTING_HOUSE_VOTES} />
          ) : (
            houseVotesQuery?.key?.results.votes?.map(
              (x: BothVotesProps, i: number) => {
                return <VotesComponent vote={x} key={i} />;
              }
            )
          )
        }
        withScroll={true}
      />
      <Accordion
        svStyle={{ marginBottom: 240 }}
        headerText={TEXT.SENATE}
        children={
          isSenateLoading ? (
            <StyledActivityIndicatorOverlay text={TEXT.GETTING_SENATE_VOTES} />
          ) : (
            senateVotesQuery?.key?.results.votes?.map(
              (x: BothVotesProps, i: number) => {
                return <VotesComponent vote={x} key={i} />;
              }
            )
          )
        }
        withScroll={true}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
