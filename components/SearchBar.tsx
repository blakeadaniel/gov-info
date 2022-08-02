import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import { TextInput } from './TextInput';

const Container = styled(View)`wp100 flx-row aic`;
const StyledTextInput = styled(TextInput)`wp100 flx-row aic`;

type SearchBarProps = {
    style?: StyleProp<ViewStyle>;
}


export function SearchBar({style}: SearchBarProps) {
    const [searchText, setSearchText] = React.useState('');

    return (
        <Container style={style}>
            <StyledTextInput text={searchText} onChangeValue={setSearchText} cancelButton={true}/>
        </Container>
    )
}