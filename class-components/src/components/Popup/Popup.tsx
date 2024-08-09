import styles from './Popup.module.css';
import { useDispatch } from 'react-redux';
import { PopupProps } from './Popup.type';
import { AppDispatch } from '../../store/store';
import { unselectItem } from '../../store/cardsSlice';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export function Popup({ selectedCards }: PopupProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useContext(ThemeContext);
  const unselectHandler = () => {
    selectedCards.forEach((card) => {
      dispatch(unselectItem(card));
    });
  };

  const handleFileLoad = () => {
    const csv = Papa.unparse(selectedCards);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const fileName = `${selectedCards.length}_planets.csv`;
    saveAs(blob, fileName);
  };

  if (selectedCards.length) {
    return (
      <div className={styles.popup} data-testid="popup">
        <h3>{selectedCards.length} items are selected:</h3>
        {selectedCards.map((card) => (
          <li key={card.name}>{card.name}</li>
        ))}
        <div className={styles['popup-buttons']}>
          <button
            className={`${theme === 'light' ? styles['popup-button__dark'] : styles['popup-button']}`}
            onClick={unselectHandler}
          >
            Unselect all
          </button>

          <button
            className={`${theme === 'light' ? styles['popup-button__dark'] : styles['popup-button']}`}
            onClick={handleFileLoad}
          >
            Download
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
