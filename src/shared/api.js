import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'a034e16426b596aeae20a6d68cbc45ef',
    language: 'en-US',
  },
});

export const imageUrl = 'https://image.tmdb.org/t/p/';

export const getTrendingMovies = async page => {
  const query = `/trending/movie/week?page=${page}`;
  const { data } = await instance.get(query);
  return data;
};

export const getPopularMovies = async () => {
  const query = '/movie/popular';
  const { data } = await instance.get(query);
  return data.results;
};

export const getMovieDetails = async movieId => {
  const query = `/movie/${movieId}`;
  const { data } = await instance.get(query);
  return data;
};

export const getMovieCredits = async movieId => {
  const query = `/movie/${movieId}/credits`;
  const { data } = await instance.get(query);
  return data;
};

export const getMovieReviews = async movieId => {
  const query = `/movie/${movieId}/reviews`;
  const { data } = await instance.get(query);
  return data;
};

export const getMovieByKeyword = async (searchQuery, page) => {
  const query = `search/movie?query=${searchQuery}&page=${page}`;
  const { data } = await instance.get(query);
  return data;
};
