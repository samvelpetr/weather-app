import { useContext } from 'react';
import { CityContext } from '../context/context';
import { Link } from 'react-router-dom';

const FavoriteCities: React.FC = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }
  const { favorites, removeFromFavorites } = context;
  return (
    <div className="favorite-cities">
      {favorites.length ? (
        favorites.map((elm, i) => (
          <div key={i} className="favorite-city-item">
            <Link to={'/' + elm}>{elm}</Link>
            <button onClick={() => removeFromFavorites(elm)}>
              Remove from Favorites
            </button>
          </div>
        ))
      ) : (
        <p className="empty-favorites">Favorites is empty...</p>
      )}
    </div>
  );
};
export default FavoriteCities;
