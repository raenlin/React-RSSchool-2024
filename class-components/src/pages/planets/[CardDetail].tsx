import styles from './CardDetail.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { Planet } from '../../utils/types';
import { planetsApi } from '../../store/planetsApi';
import { useRouter } from 'next/router';

function CardDetails() {
  const router = useRouter();
  const id = router.query.CardDetail as string;
  const { theme } = useContext(ThemeContext);

  const { data, error, isLoading } = planetsApi.useGetPlanetsQuery({
    search: id ? id : '',
  });
  const items: Planet[] = data ? data.results : [];

  const handleClick = () => {
    router.push(`/`);
  };

  if (!items) {
    return;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles['card-details']}>
          {items.map((item) => (
            <div key={item.name}>
              <h2>{item.name}</h2>
              <div>
                <p>Diameter: {item.diameter}</p>
                <p>Rotation-period: {item.rotation_period}</p>
                <p>Orbital-period: {item.orbital_period}</p>
                <p>Climate: {item.climate}</p>
                <p>Terrain: {item.terrain}</p>
                <p>Gravity: {item.gravity}</p>
                <p>Population: {item.population}</p>
                <p>Surface-water: {item.surface_water}</p>
                <p>Created: {item.created}</p>
              </div>
            </div>
          ))}
          <button
            onClick={handleClick}
            className={`${theme === 'light' ? 'card-details-close card-details-close__dark' : 'card-details-close'}`}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

// CardDetails.getLayout = function getLayout(CardDetails: ReactNode) {
//   return <planets>{CardDetails}</planets>;
// };

export default CardDetails;
