export const ENDPOINTS = {
  GENERAL: 'https://api.govinfo.gov/',
  PACKAGE_DETAILS: 'https://www.govinfo.gov/app/details/',
  PRO_PUBLICA_DEFAULT: 'https://api.propublica.org/congress/v1/',
  CONGRESS_VOTES_1: 'https://api.propublica.org/congress/v1/',
  CONGRESS_VOTES_2: '/votes/recent.json',
  CONGRESS_BOTH_VOTES:
    'https://api.propublica.org/congress/v1/both/votes/recent.json',
  CONGRESS_HOUSE_VOTES:
    'https://api.propublica.org/congress/v1/house/votes/recent.json',
  CONGRESS_SENATE_VOTES:
    'https://api.propublica.org/congress/v1/senate/votes/recent.json',
  BILLS_QUERY:
    'https://api.propublica.org/congress/v1/bills/search.json?query=',
  BILLS_NO_QUERY:
    'https://api.propublica.org/congress/v1/bills/search.json?query=',
  VOTES_BY_CHAMBER_AND_DATE:
    'https://api.propublica.org/congress/v1/{0}/votes/{1}/{2}.json',
};
