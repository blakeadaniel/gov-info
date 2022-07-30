import React from 'react';
import { View } from 'react-native';
import { TextInput } from './TextInput';

const styles = {
    container: {
        width: '100%'
    }
}

export function SearchBar() {
    const [searchText, setSearchText] = React.useState('');

    return (
        <View style={styles.container}>
            <TextInput text={searchText} onChangeValue={setSearchText}/>
        </View>
    )
}