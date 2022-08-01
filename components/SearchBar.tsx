import React from 'react';
import { styled } from '@shipt/react-native-tachyons'
import { View } from 'react-native';
import { TextInput } from './TextInput';

const Container = styled(View)`wp100 flx-row aic`;
const StyledTextInput = styled(TextInput)`wp100 flx-row aic`;


export function SearchBar() {
    const [searchText, setSearchText] = React.useState('');

    return (
        <Container>
            <StyledTextInput text={searchText} onChangeValue={setSearchText} cancelButton={true}/>
        </Container>
    )
}