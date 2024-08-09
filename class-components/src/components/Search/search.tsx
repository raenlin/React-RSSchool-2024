import styles from './Search.module.css';
import { ChangeEvent, useContext, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { SearchProp } from './Search.type';
import useLocalStorage from '../../utils/localStorageHook';
import { ThemeContext } from '../../contexts/theme';

function Search({ onSearch, setquery }: SearchProp) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [value, setValue] = useLocalStorage('searchPlanet', '');

  const { theme } = useContext(ThemeContext);

  const handleClick = () => {
    const searchText = input.trim();
    setValue(searchText);
    if (input) {
      onSearch(input.trim());
    } else {
      onSearch('');
      const defaultQuery = { search: '', page: 1 };
      setquery(defaultQuery);
    }
    setInput('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setValue(event.target.value);
  };

  const handleError = () => setError(true);

  if (error) {
    throw new Error('I crashed!');
  } else {
    return (
      <section className={styles.search}>
        <div className={styles['search-inner']}>
          <Input
            value={value}
            type="text"
            className={`${theme === 'light' ? styles['search-inner__input-dark'] : styles['search-inner__input']}`}
            placeholder="Type planet to search..."
            onChange={handleChange}
          />
          <Button
            className={`${theme === 'light' ? styles['search-inner__button-dark'] : styles['search-inner__button']}`}
            onClick={handleClick}
            name="Search"
          />
          <button
            className={`${theme === 'light' ? styles['search-inner__button-error__dark'] : styles['search-inner__button-error']}`}
            onClick={handleError}
          >
            Error!
          </button>
        </div>
      </section>
    );
  }
}

export default Search;
