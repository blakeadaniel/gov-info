import { useQuery } from '@tanstack/react-query';
import { TIME_IN_MILLISECONDS } from '../constants/constants';
import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { QUERIES } from '../constants/Queries';
import { queryClient } from '../store/queryClient';
import { Alert } from 'react-native';
import { TEXT } from '../constants/Text';
import { errorText } from '../utils/getErrorMessageText';
import { UseExactCollectionsQueryProperties } from '../fetchers/types';
import { fetchCollections } from '../fetchers/fetchCollection';

export function useExactCollectionsQuery({
  collectionCode,
  lastModifiedStartDate,
  lastModifiedEndDate,
  pageSize,
  offsetMark = '%2A',
}: UseExactCollectionsQueryProperties) {
  return useQuery(
    [QUERIES.BILLS],
    () =>
      fetchCollections({
        collectionCode,
        lastModifiedStartDate,
        lastModifiedEndDate,
        pageSize,
        offsetMark,
      }),
    {
      onSuccess: (response: any) => {
        queryClient.setQueryData([QUERIES.BILLS], { key: response });
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
    }
  );
}
