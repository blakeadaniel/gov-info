import React from 'react';
import { useSearchQuery } from '../../fetchers/fetchBills';
import { BillsList } from './BillsList';
import { BillsLoading } from './BillsLoading';

export function BillsResults({
  searchText,
  showBills,
}: {
  searchText: string | undefined;
  showBills: boolean;
}) {
  const {
    data: searchData,
    isLoading,
    isFetching,
  } = useSearchQuery(searchText);
  const gatheringData = isLoading || isFetching;
  if (!!searchData && !gatheringData) {
    return <BillsList data={searchData} searchText={searchText} />;
  }
  if (!!gatheringData && !!searchText) {
    return (
      <BillsLoading displayLoading={gatheringData} searchText={searchText} />
    );
  } else return null;
}
