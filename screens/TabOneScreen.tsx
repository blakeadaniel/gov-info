import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { Text, View } from '../components/Themed';
import { useSearch } from '../hooks/useSearch';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const thing = useSearch('collections')

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
      <SearchBar/>
      {/* <Text>{thing}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
  searchBarContainer: {
    width: '85%'
  }
});
