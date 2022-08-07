export type UseExactCollectionsQueryProperties = {
  collectionCode: string;
  lastModifiedStartDate: string;
  lastModifiedEndDate?: string;
  pageSize: number;
  offsetMark?: string;
};

export type Chambers = 'house' | 'senate' | 'both';

export type UseCurrentVotesQueryProperties = {
  chamber: Chambers;
};

export type PartyProp = {
  party: 'Republican' | 'Democratic' | 'Independent';
};

export type VoteCountType = {
  majority_opinion?: 'Yes' | 'No';
  no: number;
  not_voting: number;
  present: number;
  yes: number;
};

export type NominationType = {
  agency: string;
  name: string;
  nomination_id: string;
  number: string;
};

export type BothVotesProps = {
  amendment: any;
  bill: any;
  chamber: 'Senate' | 'House';
  congress: number;
  date: string;
  democratic: VoteCountType;
  description: string;
  independent: VoteCountType;
  nomination: NominationType;
  question: string;
  question_text: string;
  republican: VoteCountType;
  result: string;
  roll_call: number;
  session: number;
  source: string;
  time: string;
  total: VoteCountType;
  url: string;
  vote_type: string;
  vote_uri: string;
};

export type Votes = {
  vote: BothVotesProps;
};
