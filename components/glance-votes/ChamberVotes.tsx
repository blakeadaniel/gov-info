import React from 'react';
import { VotesComponent } from '../votes/Votes';
import { styled } from '@shipt/react-native-tachyons';
import { ActivityIndicatorOverlay } from '../ActivityIndicatorOverlay';
import { FlatList } from 'react-native';

const StyledActivityIndicatorOverlay = styled(
  ActivityIndicatorOverlay
)`mt6 asc`;

export function ChamberVotes({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  const renderData = data?.key?.results?.votes;

  if (isLoading || !renderData)
    return (
      <>
        <StyledActivityIndicatorOverlay text={'Loading...'} />
      </>
    );

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return <VotesComponent vote={item} key={index} />;
  };

  return (
    <FlatList
      data={renderData}
      renderItem={renderItem}
      initialNumToRender={5}
      showsVerticalScrollIndicator={false}
    />
  );
}
