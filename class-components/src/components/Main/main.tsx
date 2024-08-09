import styles from './main.module.css';
import Card from '../Card/Card';
import { MainProps } from './Main.type';
import { Pagination } from '../Pagination/pagination';
import { useState } from 'react';
import { Popup } from '../Popup/Popup';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function Main({ items, pages, setquery, query }: MainProps) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const selectedCards = useSelector((state: RootState) => state.cards.selectedCards);
  return (
    <section className={styles.main}>
      <div className={styles['main-list__wrapper']}>
        <ul className={styles['main-list']}>
          {items.map((item) => (
            <Card
              key={item.name}
              className={styles['main-list__item']}
              innerClassName={styles['main-list__item-inner']}
              item={item}
              setIsPopupVisible={setIsPopupVisible}
            />
          ))}
        </ul>
      </div>
      {location.pathname === '/' && <Pagination pages={pages} setquery={setquery} query={query} />}
      {isPopupVisible && <Popup selectedCards={selectedCards} />}
    </section>
  );
}

export default Main;
