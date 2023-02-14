import { Link, NavLink } from 'react-router-dom';
import SvgIcon from 'components/SvgIcon/SvgIcon';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrap}>
        <div className={styles.logo}>
          <Link to="/">
            <SvgIcon id="svg" />
          </Link>
        </div>
        <nav className={styles.navMenu}>
          <NavLink className={styles.navLink} to="/">
            Home
          </NavLink>
          <NavLink className={styles.navLink} to="/movies">
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
