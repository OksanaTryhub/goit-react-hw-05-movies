import { useState, useEffect } from 'react';

import { getTrendingMovies } from './../shared/api';

import MovieList from 'components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  // const onMovieClick = () => {
  //   console.log('click');
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <MovieList
        movies={movies}
        // onClick={onMovieClick}
      />
    </div>
  );
};

export default HomePage;
