import { proxy } from 'valtio';

type State = any;

export const billSearch = proxy<State>({
  data: undefined,
});

/**
 * Sets data from response.
 * @param data The data the comes back from bill search query.
 */
const setBillSearchData = (data: any) => {
  billSearch.data = data;
};

export const billSearchActions = { setBillSearchData };
