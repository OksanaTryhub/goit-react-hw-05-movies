import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'a034e16426b596aeae20a6d68cbc45ef',
    // per_page: 12,
    // image_type: 'photo',
    // safesearch: true,
  },
});

export const imageUrl = 'https://image.tmdb.org/t/p/';

export const getTrendingMovies = async () => {
  const query = '/trending/movie/week';
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
