import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import { Text, View } from 'react-native';
import { BillProps } from '../../types/types';

const BillContainer = styled(View)`ba mv2 mh3 pa2 br2`;
const BillTitle = styled(Text)``;

type BillComponentProps = {
  bill: BillProps;
};

export function Bill({ bill }: BillComponentProps) {
  return (
    <BillContainer>
      <BillTitle>{bill.title}</BillTitle>
    </BillContainer>
  );
}
