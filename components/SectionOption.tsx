import React from 'react';
import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { Path, Svg } from 'react-native-svg';
import { LineDivider } from './LineDivider';

const SectionOptionAndLineDivider = styled(View)``;
const SectionOptionContainer = styled(TouchableOpacity)`wp100 h4 ph2 jcc flx-row jcsb mb1`;
const SectionOptionText = styled(Text)`asc max-wp90`;
const SvgContainer = styled(View)`jcc`;
const StyledSVG = styled(Svg)`h3 w3`;
const StyledLineDivider = styled(LineDivider)`mh2`;

type SectionOptionProps = {
    optionTitle: string;
    style?: StyleProp<ViewStyle>;
    optionCode: string;
    onPress?: () => void;
}

export function SectionOption({optionTitle, style, optionCode, onPress}: SectionOptionProps) {
const handleOnPress = React.useCallback(() => {
    () => {}
}, []);

const arrow = "M13.6207 6.70872C13.6207 6.72748 13.6207 6.74624 13.6207 6.765C13.6096 6.84224 13.5986 6.91727 13.5875 6.989C13.5324 7.17107 13.4441 7.34321 13.3007 7.48555L8.58893 12.194C8.15858 12.6243 7.46341 12.6243 7.03307 12.194C6.60272 11.7625 6.60272 11.064 7.03307 10.6337L9.85789 7.80886L1.48272 7.80886C0.875824 7.80886 0.379272 7.31452 0.379272 6.70541C0.379272 6.09521 0.875824 5.60196 1.48272 5.60196L9.85789 5.60196L7.03307 2.77714C6.60272 2.34679 6.60272 1.64831 7.03307 1.21686C7.46341 0.786517 8.15858 0.786517 8.58893 1.21686L13.2786 5.90872C13.4882 6.10955 13.6207 6.39203 13.6207 6.70541L13.6207 6.70872Z";
const arrowSVG = (
    <SvgContainer>
    <StyledSVG>
      <Path stroke="rgb(16, 115, 19)" strokeWidth={2} fill="none" d={arrow} />
    </StyledSVG>
  </SvgContainer>
)
    return (
        <SectionOptionAndLineDivider style={style}>
        <SectionOptionContainer onPress={onPress}>
            <SectionOptionText numberOfLines={2}>{optionTitle}</SectionOptionText>
            {arrowSVG}
        </SectionOptionContainer>
        <StyledLineDivider/>
        </SectionOptionAndLineDivider>
    )
}