import { proxy } from "valtio";

type State = any;

export const collectionState = proxy<State>({
  data: undefined,
});

/**
 * Sets a selected credit card for the user.
 * @param card The credit card that the user has selected to make a purchase or order.
 */
const setCollectionData = (data: any) => {
  collectionState.data = data;
};

export const collectionDataActions = { setCollectionData };
