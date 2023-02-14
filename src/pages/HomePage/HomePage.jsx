import { useState, useEffect } from 'react';

import { getTrendingMovies } from '../../shared/api';

import MovieList from 'components/MovieList/MovieList';
import Button from 'components/Button/Button';

import styles from './HomePage.module.scss';
import Loader from 'components/Loader/Loader';

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

  const myMap = new Map();
  movies.forEach(movie => myMap.set(movie.id, movie));
  const uniqueMovies = Array.from(myMap.values());

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <MovieList
          movies={uniqueMovies}
          title={<p className={styles.text}>Trending movies</p>}
        />
      )}
      {!loading && totalPages > 1 && page < totalPages && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};

export default HomePage;
