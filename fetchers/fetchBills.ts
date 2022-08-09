import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { billSearchActions } from '../state/billState';

const axios = require('axios');

export const fetchBills = async (searchTerm: string) => {
  let endpoint;
  const myTemplate = ({ searchTerm }: any) =>
    `${ENDPOINTS.BILLS_QUERY}{${searchTerm}}`;
  if (!!searchTerm) {
    endpoint = myTemplate({
      searchTerm,
    });
  } else endpoint = ENDPOINTS.BILLS_NO_QUERY;
  const request = await axios.get(endpoint, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  });
  billSearchActions.setBillSearchData(request?.data);
  return request?.data ?? [];
};
