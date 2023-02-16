import PropTypes from 'prop-types';

import styles from './MovieListItem.module.scss';

const MovieListItem = ({ image, title, date }) => {
  return (
    <li className={styles.imageGalleryItem}>
      <img className={styles.imageGalleryItem__image} src={image} alt={title} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.subtitle}>{date}</h4>
      </div>
    </li>
  );
};

export default MovieListItem;

MovieListItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
