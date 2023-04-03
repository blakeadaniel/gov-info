import React from 'react';
import { ActivityIndicatorOverlay } from '../ActivityIndicatorOverlay';

export function BillsLoading({
  displayLoading,
  searchText,
}: {
  displayLoading: boolean | undefined;
  searchText: string;
}) {
  if (!!displayLoading && !!searchText) {
    return (
      <ActivityIndicatorOverlay
        style={{ marginTop: 200 }}
        text={`Searching for Bills related to\n${searchText}...`}
      />
    );
  } else return null;
}
