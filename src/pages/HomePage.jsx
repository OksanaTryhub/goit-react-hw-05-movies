import { useState, useEffect } from 'react';

import { getTrendingMovies } from './../shared/api';

import MovieList from 'components/MovieList/MovieList';
import Button from 'components/Button/Button';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = (data, page) => {
      return page === 1
        ? setMovies(data)
        : setMovies(prevMovies => [...prevMovies, ...data]);
    };

    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);

        const data = await getTrendingMovies(page);
        getMovies(data.results, page);

        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, [setMovies, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <MovieList movies={movies} title={'Trending movies'} />
      {!loading && totalPages > 1 && page < totalPages && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};

export default HomePage;
