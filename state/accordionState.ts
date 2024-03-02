import { proxy } from 'valtio';

type State = any;

export const accordionState = proxy<State>({
  isExpanded: false,
});

const setAccordionState = (isExpanded: boolean) => {
  accordionState.isExpanded = isExpanded;
};

export const accordionStateActions = { setAccordionState };
