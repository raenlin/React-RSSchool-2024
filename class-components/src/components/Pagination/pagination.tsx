// import { Link } from 'react-router-dom';
import styles from './pagination.module.css';
import { PaginationProps } from './pagination.type';

export function Pagination({ pages, setquery, query }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <ul className={styles['pagination-list']}>
        {pages.map((page) => (
          <li
            key={page}
            className={
              query === page
                ? styles['pagination-list__item-active']
                : styles['pagination-list__item']
            }
            onClick={() => {
              setquery({
                page: page,
              });
            }}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
}
