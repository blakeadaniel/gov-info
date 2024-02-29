import { ENDPOINTS } from '../constants/Endpoints';
import { API_KEY } from '../constants/Key';
import { QUERIES } from '../constants/Queries';
import { collectionDataActions } from '../state/collectionState';
import { queryClient } from '../store/queryClient';
import { Collection, UseExactCollectionsQueryProperties } from './types';

export const fetchCollections = async ({
  collectionCode,
  lastModifiedStartDate,
  lastModifiedEndDate,
  pageSize,
  offsetMark = '*',
}: UseExactCollectionsQueryProperties) => {
  const format = ({
    collectionCode,
    lastModifiedStartDate,
    lastModifiedEndDate,
    pageSize,
    offsetMark,
  }: UseExactCollectionsQueryProperties) =>
    `${
      ENDPOINTS.GENERAL
    }${'collections'}/${collectionCode}/${lastModifiedStartDate}?pageSize=${pageSize}&offsetMark=${offsetMark}&api_key=${
      API_KEY.GOV_KEY
    }`;
  const formattedWithTemplate = format({
    collectionCode,
    lastModifiedStartDate,
    lastModifiedEndDate,
    pageSize,
    offsetMark,
  });
  let response = (await fetch(formattedWithTemplate, {
    headers: { 'x-api-key': API_KEY.GOV_KEY },
  })) as any;
  return response.json({ limit: '500mb' });
};
