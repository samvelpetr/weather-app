import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteContext } from '../context/favoriteContext';
import { createUseStyles } from 'react-jss';
import styles from '../styles';

interface IProps {
  cityData: string;
}

const useStyles = createUseStyles(styles);

const FavoriteCityItem: React.FC<IProps> = ({ cityData }) => {
  const favoriteContext = useContext(FavoriteContext);
  const classes = useStyles();

  if (!favoriteContext) {
    throw new Error('context must be initialized');
  }
  const { removeFromFavorites } = favoriteContext;

  return (
    <div className={classes.favoriteCityItem}>
      <Link to={'/' + cityData}>{cityData}</Link>
      <button onClick={() => removeFromFavorites(cityData)}>
        Remove from Favorites
      </button>
    </div>
  );
};
export default FavoriteCityItem;
