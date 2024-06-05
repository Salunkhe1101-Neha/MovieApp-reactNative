import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, Button, StyleSheet } from 'react-native';
import axios from './axios';

export default function Row({ title, fetch, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(fetch + `&page=${page}`);
      if (page === 1) {
        setMovies(req.data.results);
      } else {
        setMovies(prevMovies => [...prevMovies, ...req.data.results]);
      }
    }
    fetchData();
  }, [fetch, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.original_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const baseUrl = 'https://image.tmdb.org/t/p/original/';
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal>
        {filteredMovies.map(movie => (
          <TouchableOpacity key={movie.id} style={styles.movieContainer}>
            <Image
              style={styles.image}
              source={{ uri: `${baseUrl}${movie.poster_path}` }}
            />
            <Text style={styles.movieTitle}>
              {movie.original_name || movie.title || movie.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>Load More</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  movieContainer: {
    marginRight: 10,
    width: 140,
  },
  image: {
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
  },
  loadMoreButton: {
    backgroundColor: '#e50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loadMoreText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
