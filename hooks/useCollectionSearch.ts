import { useQuery } from '@tanstack/react-query';
import { TIME_IN_MILLISECONDS } from '../constants/constants';
import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { QUERIES } from '../constants/Queries';
import { queryClient } from '../store/queryClient';
import { Alert } from 'react-native';
import { TEXT } from '../constants/Text';
import { errorText } from '../utils/getErrorMessageText';

const axios = require('axios');

type UseExactCollectionsQueryProperties = {
    collectionCode: string;
    lastModifiedStartDate: string;
    lastModifiedEndDate?: string;
    pageSize: number;
    offsetMark?: string;
}

export function useExactCollectionsQuery({collectionCode, lastModifiedStartDate, lastModifiedEndDate, pageSize, offsetMark = '%2A'}: UseExactCollectionsQueryProperties) {

  return useQuery(
    [QUERIES.BILLS],
    () => fetchCollections({collectionCode, lastModifiedStartDate, lastModifiedEndDate, pageSize, offsetMark}),
    {
        onSuccess: (response: any) => {
          queryClient.setQueryData([QUERIES.BILLS], {key: response});
     },
     onError: (error) => {
      Alert.alert(
        TEXT.SOMETHING_WENT_WRONG,
        errorText(error),
        [
          {
            text: TEXT.OKAY,
            style: 'default',
          }
        ]
      )
    },
      staleTime: TIME_IN_MILLISECONDS.MINUTE * 10
    }
  );
}

const fetchCollections = async ({collectionCode, lastModifiedStartDate, lastModifiedEndDate, pageSize, offsetMark}: UseExactCollectionsQueryProperties) => {

  const myTemplate = ({collectionCode, lastModifiedStartDate, lastModifiedEndDate, pageSize, offsetMark}: UseExactCollectionsQueryProperties) => 
  `${ENDPOINTS.GENERAL}${'collections'}/${collectionCode}/${lastModifiedStartDate}?pageSize=${pageSize}&offsetMark=${offsetMark}&api_key=${API_KEY.KEY}`;

  const formattedWithTemplate = myTemplate({collectionCode, lastModifiedStartDate, lastModifiedEndDate, pageSize, offsetMark});
  console.log('formattedWithTemplate', formattedWithTemplate)
  const request = await axios.get(formattedWithTemplate);
  return request?.data ?? [];
};