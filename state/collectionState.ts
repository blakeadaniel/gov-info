import { proxy } from 'valtio';

type State = any;

export const collectionState = proxy<State>({
  data: undefined,
});

/**
 * Sets data from response.
 * @param data The data the comes back from each collection request.
 */
const setCollectionData = (data: any) => {
  collectionState.data = data;
};

export const collectionDataActions = { setCollectionData };
