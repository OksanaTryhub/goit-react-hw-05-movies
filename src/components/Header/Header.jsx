import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/"> MOVIES</Link>
        </div>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
