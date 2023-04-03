import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { QUERIES } from '../constants/Queries';
import {
  voteHouseDataActions,
  voteSenateDataActions,
  voteBothDataActions,
} from '../state/voteState';
import { queryClient } from '../store/queryClient';
import { UseCurrentVotesQueryProperties } from './types';

const axios = require('axios');

export const fetchVotes = async ({
  chamber,
}: UseCurrentVotesQueryProperties) => {
  const myTemplate = ({ chamber }: UseCurrentVotesQueryProperties) =>
    `${ENDPOINTS.CONGRESS_VOTES_1}${chamber}${ENDPOINTS.CONGRESS_VOTES_2}`;

  const formattedWithTemplate = myTemplate({
    chamber,
  });
  const request = await axios.get(formattedWithTemplate, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  });
  if (chamber === 'house') {
    voteHouseDataActions.setHouseVoteData(request?.data);
  }
  if (chamber === 'senate') {
    voteSenateDataActions.setSenateVoteData(request?.data);
  }
  if (chamber === 'both') {
    voteBothDataActions.setBothVoteData(request?.data);
  }
  return request?.data ?? [];
};

export const fetchSearch = async (search: any) => {
  const myTemplate = (search: string) => {
    if (!!search) {
      return `${ENDPOINTS.BILLS_QUERY}${search}`;
    } else return ENDPOINTS.BILLS_NO_QUERY;
  };
  const formattedWithTemplate = myTemplate(search);
  let response = (await fetch(formattedWithTemplate, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  })) as any;
  return response.json();
};

export const fetchBothVotes = async () => {
  let response = (await fetch(ENDPOINTS.CONGRESS_BOTH_VOTES, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  })) as any;
  return response.json();
};

export const fetchHouseVotes = async () => {
  let response = (await fetch(ENDPOINTS.CONGRESS_HOUSE_VOTES, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  })) as any;
  return response.json();
};

export const fetchSenateVotes = async () => {
  let response = (await fetch(ENDPOINTS.CONGRESS_SENATE_VOTES, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  })) as any;
  return response.json();
};
