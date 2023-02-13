import styles from './MovieListItem.module.scss';

const MovieListItem = ({
  image,
  title,
  date,
  // onClick
}) => {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        className={styles.imageGalleryItem__image}
        src={image}
        alt={title}
        // onClick={onClick}
      />
      <h3>{title}</h3>
      <p>{date}</p>
    </li>
  );
};

export default MovieListItem;
