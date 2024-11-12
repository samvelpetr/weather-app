import { useContext } from 'react';
import { CityContext } from '../context/context';
import FavoriteCityItem from './FavoriteCityItem';

const FavoriteCities: React.FC = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }
  const { favorites } = context;
  return (
    <div className="favorite-cities">
      {favorites.length ? (
        favorites.map((elm, i) => <FavoriteCityItem key={i} cityData={elm} />)
      ) : (
        <p className="empty-favorites">Favorites is empty...</p>
      )}
    </div>
  );
};
export default FavoriteCities;
