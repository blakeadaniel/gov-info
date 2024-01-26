import { useQuery } from '@tanstack/react-query';
import { TIME_IN_MILLISECONDS } from '../constants/constants';
import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { QUERIES } from '../constants/Queries';
import { queryClient } from '../store/queryClient';
import { Alert } from 'react-native';
import { TEXT } from '../constants/Text';
import { errorText } from '../utils/getErrorMessageText';
import { billSearchActions } from '../state/billState';

export const useSearchQuery = (search: any) => {
  return useQuery([QUERIES.SEARCH], () => fetchSearch(search), {
    onSuccess: (response: any) => {
      queryClient.setQueryData([QUERIES.SEARCH], { key: response });
    },
    onError: (error) => {
      Alert.alert(TEXT.SOMETHING_WENT_WRONG, errorText(error), [
        {
          text: TEXT.OKAY,
          style: 'default',
        },
      ]);
    },
    staleTime: TIME_IN_MILLISECONDS.MINUTE / 60,
  });
};

export const fetchSearch = async (search: string) => {
  const format = (search: string) => {
    if (!!search) {
      return `${ENDPOINTS.BILLS_QUERY}${search}`;
    } else return ENDPOINTS.BILLS_NO_QUERY;
  };
  const formattedWithTemplate = format(search);
  let response = await fetch(formattedWithTemplate, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  });
  return response.json();
};
