import { useQuery } from '@tanstack/react-query';
import { TIME_IN_MILLISECONDS } from '../constants/constants';
import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { QUERIES } from '../constants/Queries';
import { queryClient } from '../store/queryClient';
import { Alert } from 'react-native';
import { TEXT } from '../constants/Text';
import { errorText } from '../utils/getErrorMessageText';
import {
  BothVotesProps,
  UseCurrentVotesQueryProperties,
} from '../fetchers/types';
import { fetchCollections } from '../fetchers/fetchCollection';
import {
  fetchVotes,
  fetchBothVotes,
  fetchHouseVotes,
  fetchSenateVotes,
} from '../fetchers/fetchVotes';

export function useVotesQuery({ chamber }: UseCurrentVotesQueryProperties) {
  return useQuery(
    [QUERIES.VOTES],
    () =>
      fetchVotes({
        chamber,
      }),
    {
      onSuccess: (response: any) => {
        queryClient.setQueryData([QUERIES.BOTH_VOTES], { key: response });
      },
      onError: (error: any) => {
        Alert.alert(TEXT.SOMETHING_WENT_WRONG, errorText(error), [
          {
            text: TEXT.OKAY,
            style: 'default',
          },
        ]);
      },
      staleTime: TIME_IN_MILLISECONDS.MINUTE * 10,
    }
  );
}

export function useBothVotesQuery() {
  return useQuery([QUERIES.BOTH_VOTES], fetchBothVotes, {
    onSuccess: (response: any) => {
      queryClient.setQueryData([QUERIES.BOTH_VOTES], { key: response });
    },
    onError: (error: any) => {
      Alert.alert(TEXT.SOMETHING_WENT_WRONG, errorText(error), [
        {
          text: TEXT.OKAY,
          style: 'default',
        },
      ]);
    },
    staleTime: TIME_IN_MILLISECONDS.MINUTE * 10,
  });
}

export function useHouseVotesQuery() {
  return useQuery([QUERIES.HOUSE_VOTES], () => fetchHouseVotes(), {
    onSuccess: (response: any) => {
      queryClient.setQueryData([QUERIES.HOUSE_VOTES], { key: response });
    },
    onError: (error: any) => {
      Alert.alert(TEXT.SOMETHING_WENT_WRONG, errorText(error), [
        {
          text: TEXT.OKAY,
          style: 'default',
        },
      ]);
    },
    staleTime: TIME_IN_MILLISECONDS.MINUTE * 10,
  });
}

export function useSenateVotesQuery() {
  return useQuery([QUERIES.SENATE_VOTES], () => fetchSenateVotes(), {
    onSuccess: (response: any) => {
      queryClient.setQueryData([QUERIES.SENATE_VOTES], { key: response });
    },
    onError: (error: any) => {
      Alert.alert(TEXT.SOMETHING_WENT_WRONG, errorText(error), [
        {
          text: TEXT.OKAY,
          style: 'default',
        },
      ]);
    },
    staleTime: TIME_IN_MILLISECONDS.MINUTE * 10,
  });
}
