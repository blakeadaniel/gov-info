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
  console.log('formattedWithTemplate', formattedWithTemplate);
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

export const fetchBothVotes = async () => {
  const request = await axios.get(ENDPOINTS.CONGRESS_BOTH_VOTES, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  });
  voteBothDataActions.setBothVoteData(request?.data);
  console.log('request?.data', request?.data);
  return request?.data ?? [];
};

export const fetchHouseVotes = async () => {
  const request = await axios.get(ENDPOINTS.CONGRESS_HOUSE_VOTES, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  });
  voteHouseDataActions.setHouseVoteData(request?.data);
  return request?.data ?? [];
};

export const fetchSenateVotes = async () => {
  const request = await axios.get(ENDPOINTS.CONGRESS_SENATE_VOTES, {
    headers: { 'x-api-key': API_KEY.PRO_PUBLICA_KEY },
  });
  voteSenateDataActions.setSenateVoteData(request?.data);
  return request?.data ?? [];
};
