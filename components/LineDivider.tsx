import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';

const Divider = styled(View, { height: 1 })`bg-grey o-20`;

type LineDividerProps = {
    style?: StyleProp<ViewStyle>;
}

export function LineDivider({ style }: LineDividerProps) {
    return (
        <Divider style={style}/>
    )
}