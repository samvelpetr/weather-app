import { memo, useContext } from 'react';
import FavoriteCityItem from './FavoriteCityItem';
import { FavoriteContext } from '../context/favoriteContext';
import { createUseStyles } from 'react-jss';
import styles from '../styles';

const useStyles = createUseStyles(styles);

const FavoriteCities: React.FC = memo(() => {
  const context = useContext(FavoriteContext);
  const classes = useStyles();

  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }
  const { favorites } = context;
  return (
    <div className={classes.favoriteCities}>
      {favorites.length ? (
        favorites.map((elm) => <FavoriteCityItem key={elm} cityData={elm} />)
      ) : (
        <p className={classes.emptyFavorites}>Favorites is empty...</p>
      )}
    </div>
  );
});
export default FavoriteCities;
