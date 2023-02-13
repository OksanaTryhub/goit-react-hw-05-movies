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

export const imageUrl = 'https://image.tmdb.org/t/p/w342/';

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

export const getGenres = async () => {
  const query = `/genre/movie/list`;
  const { data } = await instance.get(query);
  return data;
};
