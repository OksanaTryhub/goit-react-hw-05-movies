import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './SearchMovie.module.scss';
import { ReactComponent as SearchIcon } from '../SvgIcon/search.svg';

const SearchMovie = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ searchQuery });
  };

  return (
    <div>
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            className={styles.searchForm__input}
            value={searchQuery}
            onChange={handleChange}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
          />
          <button type="submit" className={styles.searchForm__button}>
            <span className={styles.searchForm__buttonLabel}>
              <SearchIcon width="28px" height="28px" />
            </span>
          </button>
        </form>
      </header>
    </div>
  );
};

export default SearchMovie;

SearchMovie.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
