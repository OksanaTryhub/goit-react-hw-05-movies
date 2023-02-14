import MovieListItem from 'components/MovieListItem/MovieListItem';
import { imageUrl } from '../../shared/api.js';
import { getReleaseYear } from '../../shared/getDate';

import { Link } from 'react-router-dom';

import styles from './MovieList.module.scss';

const MovieList = ({ movies, title }) => {
  return (
    <div>
      <h2 className={styles.movieListTitle}>{title}</h2>
      <ul className={styles.movieList}>
        {movies.map(({ id, title, release_date, poster_path }) => (
          <Link key={id} to={`/movies/${id}`} className={styles.movieListItem}>
            <MovieListItem
              image={
                poster_path ? `${imageUrl}w342/${poster_path}` : 'No image'
              }
              date={release_date ? getReleaseYear(release_date) : 'Unknown'}
              title={title}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
