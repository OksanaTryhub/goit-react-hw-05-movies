import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchMovie from 'components/SearchMovie/SearchMovie';
import MovieList from 'components/MovieList/MovieList';
import Button from 'components/Button/Button';
import { getMovieByKeyword } from '../../shared/api';
import Loader from 'components/Loader/Loader';

import styles from './MoviesPage.module.scss';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalMovies, setTotalMovies] = useState('');
  const [totalPages, setTotalPages] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('query');

  useEffect(() => {
    if (search) {
      const fetchMovies = async () => {
        try {
          setLoading(true);

          const data = await getMovieByKeyword(search, page);
          setTotalPages(data.total_pages);

          if (data.results === 0) {
            // warningMessage();
            console.log('empty');
          }
          setMovies(prevMovies => [...prevMovies, ...data.results]);
          setTotalMovies(data.total_results);
        } catch (error) {
          console.log(error.message);
          // errorMessage(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    }
  }, [page, search]);

  const searchMovies = ({ searchQuery }) => {
    const query = searchQuery.trim();

    if (query === search) {
      return;
    }
    if (query === '') {
      setMovies([]);
      setTotalPages(null);
      setSearchParams({});
      return;
    }
    setSearchParams({ query });
    setPage(1);
    setMovies([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const myMap = new Map();
  movies.forEach(movie => myMap.set(movie.id, movie));
  const uniqueMovies = Array.from(myMap.values());

  return (
    <div>
      <SearchMovie onSubmit={searchMovies} />
      {!movies.length && !loading && (
        <p className={styles.text}>Let's look for the movie</p>
      )}
      {loading ? (
        <Loader />
      ) : (
        <MovieList
          movies={uniqueMovies}
          title={
            totalMovies &&
            search && (
              <p className={styles.text}>
                Found {totalMovies} movies for "{search}"
              </p>
            )
          }
        />
      )}

      {!loading && totalPages > 1 && page < totalPages && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};

export default MoviesPage;
