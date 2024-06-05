import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';
import Row from './Row';
import Requests from './Request';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        placeholderTextColor="#888"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <ScrollView>
        <Row title="NetFlix Originals" fetch={Requests.fectchNetflixOriginals} searchQuery={searchQuery} />
        <Row title="Trending" fetch={Requests.fetchTrending} searchQuery={searchQuery} />
        <Row title="Top Rated" fetch={Requests.fetchTopRated} searchQuery={searchQuery} />
        <Row title="Upcoming" fetch={Requests.fetchUpComing} searchQuery={searchQuery} />
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#333',
  },
});
