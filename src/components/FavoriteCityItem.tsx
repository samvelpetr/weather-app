import { useContext } from 'react';
import { CityContext } from '../context/context';
import { Link } from 'react-router-dom';

interface IProps {
  cityData: string;
}

const FavoriteCityItem: React.FC<IProps> = ({ cityData }) => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }
  const { removeFromFavorites } = context;
  return (
    <div className="favorite-city-item">
      <Link to={'/' + cityData}>{cityData}</Link>
      <button onClick={() => removeFromFavorites(cityData)}>
        Remove from Favorites
      </button>
    </div>
  );
};
export default FavoriteCityItem;
