import { useQuery } from '@tanstack/react-query';
import { TIME_IN_MILLISECONDS } from '../constants/constants';
import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { QUERIES } from '../constants/Queries';
import { queryClient } from '../store/queryClient';
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
      staleTime: TIME_IN_MILLISECONDS.MINUTE * 10
    }
  );
}

const fetchCollections = async ({collectionCode, lastModifiedStartDate, lastModifiedEndDate, pageSize, offsetMark}: UseExactCollectionsQueryProperties) => {
  const myTemplate = ({collectionCode, lastModifiedStartDate, lastModifiedEndDate, pageSize, offsetMark}: UseExactCollectionsQueryProperties) => 
  `${ENDPOINTS.GENERAL}${'collections'}/${collectionCode}/${lastModifiedStartDate}?pageSize=${pageSize}&offsetMark=${offsetMark}&api_key=${API_KEY.KEY}`;
  const formattedWithTemplate = myTemplate({collectionCode, lastModifiedStartDate, lastModifiedEndDate, pageSize, offsetMark});
  console.log('formattedWithTemplate', formattedWithTemplate)
  const request = await axios.get('https://api.govinfo.gov/collections/BILLS/2022-01-28T15%3A18%3A10Z?pageSize=5&offsetMark=%2A&api_key=EvtDfSYhiWaVYZehbhFuZ9skpk66xxXjnewcVtDZ');
// console.log('request', request.data.collections)
  return request?.data.collections ?? [];
};
