import MovieListItem from 'components/MovieListItem/MovieListItem';
import { imageUrl } from '../../shared/api.js';
import getReleaseYear from '../../shared/getReleaseYear';

import { Link } from 'react-router-dom';

import styles from './MovieList.module.scss';

const MovieList = ({ movies }) => {
  return (
    <div>
      <h2>Trending movies</h2>
      <ul className={styles.movieList}>
        {movies.map(({ id, title, release_date, poster_path }) => (
          <Link key={id} to={`/movies/${id}`} className={styles.movieListItem}>
            <MovieListItem
              image={`${imageUrl}w342/${poster_path}`}
              date={getReleaseYear(release_date)}
              title={title}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
