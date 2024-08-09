import styles from './header.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';

function Header() {
  const { theme, handleThemeChange } = useContext(ThemeContext);
  return (
    <header>
      <div className={styles['header-wrapper']}>
        <h1 className={`${theme === 'light' ? styles['heading-dark'] : styles['heading']}`}>
          Star Wars Planets
        </h1>
        <button
          className={`${theme === 'light' ? styles['theme-button__dark'] : styles['theme-button']}`}
          onClick={handleThemeChange}
        >
          {theme}
        </button>
      </div>
    </header>
  );
}

export default Header;
