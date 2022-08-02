import { useQuery } from '@tanstack/react-query';
import { TIME_IN_MILLISECONDS } from '../constants/constants';
import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { QUERIES } from '../constants/Queries';
import { queryClient } from '../store/queryClient';
const axios = require('axios');

export function useCollectionsQuery(search: any) {

  return useQuery(
    [QUERIES.COLLECTIONS],
    () => fetchCollections(search),
    {
        onSuccess: (response: any) => {
          queryClient.setQueryData([QUERIES.COLLECTIONS], {key: response});
     },
      staleTime: TIME_IN_MILLISECONDS.MINUTE * 10
    }
  );
}

const fetchCollections = async (search: any) => {
  const myTemplate = (search: string) => `${ENDPOINTS.GENERAL}${search}?api_key=${API_KEY.KEY}`;
  const formattedWithTemplate = myTemplate(search);
  const request = await axios.get(formattedWithTemplate);
// console.log('request', request.data.collections)
  return request?.data.collections ?? [];
};
