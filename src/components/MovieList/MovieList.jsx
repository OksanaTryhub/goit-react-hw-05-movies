import MovieListItem from 'components/MovieListItem/MovieListItem';
import { imageUrl } from '../../shared/api.js';

import { Link } from 'react-router-dom';

import styles from './MovieList.module.scss';

const MovieList = ({
  movies,
  // onClick
}) => {
  return (
    <div>
      <h2>Trending movies</h2>
      <ul className={styles.imageGallery}>
        {movies.map(({ id, title, release_date, poster_path }) => (
          <Link
            key={id}
            to={`/movies/${id}`}
            className={styles.imageGalleryItem}
          >
            <MovieListItem
              image={`${imageUrl}${poster_path}`}
              date={release_date}
              title={title}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
