import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSearchQuery } from '../../fetchers/fetchBills';
import { BillProps } from '../../types/types';
import { Bill } from './Bill';
import { NoResultsFound } from '../../components/NoResultsFound';

type Bills = {
  bills: BillProps[];
};

export function BillsList({
  data,
  searchText,
}: {
  data: {
    key: {
      results: Array<Bills>;
    };
  };
  searchText: string | undefined;
}) {
  const results = data?.key?.results[0]?.bills;
  const noResults = results.length < 1;
  if (noResults) {
    return <NoResultsFound text={searchText} />;
  }
  return (
    <ScrollView>
      {results.map((bill: BillProps, i: number) => {
        return <Bill bill={bill} key={i} navigation={{}} />;
      })}
    </ScrollView>
  );
}
