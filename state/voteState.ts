import { proxy } from 'valtio';

type State = any;

export const voteStateHouse = proxy<State>({
  data: undefined,
});

/**
 * Sets data from response.
 * @param data The data the comes back from house vote request.
 */
const setHouseVoteData = (data: any) => {
  voteStateHouse.data = data;
};

export const voteHouseDataActions = { setHouseVoteData };

export const voteStateSenate = proxy<State>({
  data: undefined,
});

/**
 * Sets data from response.
 * @param data The data the comes back from senate vote request.
 */
const setSenateVoteData = (data: any) => {
  voteStateSenate.data = data;
};

export const voteSenateDataActions = { setSenateVoteData };

export const voteStateBoth = proxy<State>({
  data: undefined,
});

/**
 * Sets data from response.
 * @param data The data the comes back from both chambers vote request.
 */
const setBothVoteData = (data: any) => {
  voteStateBoth.data = data;
};

export const voteBothDataActions = { setBothVoteData };
