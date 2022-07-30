import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
      <SearchBar/>
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
