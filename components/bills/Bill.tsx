import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import { Text, TouchableOpacity, View } from 'react-native';
import { BillProps } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import { TEXT } from '../../constants/Text';

type PartyType = {
  party: 'D' | 'R' | 'I';
};

const BillContainer = styled<PartyType, typeof TouchableOpacity>(
  TouchableOpacity,
  { borderWidth: 3 }
)`mv2 mh3 pa2 br2 b--${({ party }: PartyType) =>
  party === 'R' ? 'lightcoral' : party === 'D' ? 'lightblue' : 'lightgrey'}`;
const BillTitle = styled(Text)`bold mb2`;
const SummaryText = styled(Text)`mb2`;
const InfoContainer = styled(View)`flx-row flx-wrap mb1`;
const InfoTitle = styled(Text)`underline`;
const InfoText = styled(Text)``;

type BillComponentProps = {
  bill: BillProps;
};

export function Bill({ bill }: BillComponentProps) {
  const navigation = useNavigation<any>();
  const navigateToBill = React.useCallback(() => {
    navigation.navigate('GovWebView', {
      uri: bill?.congressdotgov_url,
      pop: navigation.pop,
    });
  }, []);

  return (
    <BillContainer onPress={navigateToBill} party={bill.sponsor_party}>
      <BillTitle>{bill.short_title}</BillTitle>
      {(!!bill.summary_short || !!bill.summary) && (
        <SummaryText>
          {bill.summary_short ? bill.summary_short : bill.summary}
        </SummaryText>
      )}
      <InfoContainer>
        <InfoTitle>{TEXT.SPONSOR_NAME}</InfoTitle>
        <InfoText>{` ${bill.sponsor_title} ${bill.sponsor_name} - ${bill.sponsor_party} (${bill.sponsor_state})`}</InfoText>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>{TEXT.INTRODUCED_DATE}</InfoTitle>
        <InfoText>{` ${bill.introduced_date}`}</InfoText>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>{TEXT.LAST_MAJOR_ACTION}</InfoTitle>
        <InfoText>{`${bill.latest_major_action}`}</InfoText>
      </InfoContainer>
    </BillContainer>
  );
}
