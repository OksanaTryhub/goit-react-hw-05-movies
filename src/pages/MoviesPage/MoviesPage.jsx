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
  const [loading, setLoading] = useState(false);
  const [totalMovies, setTotalMovies] = useState('');
  const [totalPages, setTotalPages] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page');

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          setLoading(true);

          const data = await getMovieByKeyword(query, page);
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
  }, [page, query]);

  const searchMovies = ({ searchQuery }) => {
    if (searchQuery.trim() === query) {
      return;
    }
    if (searchQuery.trim() === '') {
      setMovies([]);
      setTotalPages(null);
      setSearchParams({});
      return;
    }
    setSearchParams({ query: searchQuery.trim(), page: 1 });
    setMovies([]);
  };

  const loadMore = () => {
    setSearchParams({ query, page: Number(page) + 1 });
  };

  const myMap = new Map();
  movies.forEach(movie => myMap.set(movie.id, movie));
  const uniqueMovies = Array.from(myMap.values());

  return (
    <main>
      <SearchMovie onSubmit={searchMovies} />
      {!movies.length && !loading && !query && (
        <p className={styles.text}>Let's look for the movie</p>
      )}
      {loading && <Loader />}

      {movies && query && (
        <MovieList
          movies={uniqueMovies}
          titleList={
            totalMovies ? (
              <p className={styles.text}>
                Found {totalMovies} movies for "{query}"
              </p>
            ) : (
              <p className={styles.text}>
                Oops, sorry, we didn't find any movies for "{query}"
              </p>
            )
          }
        />
      )}

      {!loading && totalPages > 1 && page < totalPages && (
        <Button onClick={loadMore} />
      )}
    </main>
  );
};

export default MoviesPage;
