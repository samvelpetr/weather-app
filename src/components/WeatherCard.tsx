import { useContext, useEffect } from 'react';
import { CityContext } from '../context/cityContext';
import { imageUrl, imageUrlEnd } from '../api/apiInfo';
import { Link, useParams } from 'react-router-dom';
import { getCityData } from '../utils/cityData';
import { FavoriteContext } from '../context/favoriteContext';
import { createUseStyles } from 'react-jss';
import styles from '../styles';

const useStyles = createUseStyles(styles);
const WeatherCard: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const context = useContext(CityContext);
  const classes = useStyles();

  const favoriteContext = useContext(FavoriteContext);
  if (!context) {
    throw new Error('context must be initialized');
  }
  if (!favoriteContext) {
    throw new Error('context must be initialized');
  }
  const { favorites, addToFavorites, removeFromFavorites } = favoriteContext;
  const { city, changeCity } = context;

  useEffect(() => {
    if (cityName != city?.name) {
      getCityData(cityName as string).then((resp) => {
        if (resp) {
          changeCity(resp);
        }
      });
    }
  }, [cityName]);

  return (
    <>
      <div className={classes.weatherCard}>
        <h1>{city?.name}</h1>

        <div>
          <div className="left-side">
            <h3>{city?.temp}°C</h3>
            <h4>Feels like: {city?.feelTemp}°C</h4>
            <p>
              Sunrise - {new Date((city?.sunrise as number) * 1000).getHours()}:
              {new Date((city?.sunrise as number) * 1000).getMinutes()}
            </p>
            <p>
              Sunset - {new Date((city?.sunset as number) * 1000).getHours()}:
              {new Date((city?.sunset as number) * 1000).getMinutes()}
            </p>
            <p className="weather-type">
              Weather Type - {city?.weatherType.main}
              <img src={imageUrl + city?.weatherType.icon + imageUrlEnd} />
            </p>
            <p>
              Wind speed - <span>{city?.wind}</span> meter/sec
            </p>
            <p>
              Humidity - <span>{city?.humidity}</span>%
            </p>
          </div>
        </div>
      </div>
      <div className={classes.favoriteActions}>
        {favorites.includes(city?.name as string) ? (
          <button
            className={classes.removeFromFavorites}
            onClick={() => removeFromFavorites(city?.name as string)}
          >
            Remove from Favorites
          </button>
        ) : (
          <button
            className={classes.addToFavorites}
            onClick={() => addToFavorites(city?.name as string)}
          >
            Add to Favorites
          </button>
        )}

        <Link to={`/${city?.name}/week`} className="forecast-link">
          5 Day Forecast
        </Link>
        <Link to={`/${city?.name}/map`}>Map</Link>
      </div>
    </>
  );
};
export default WeatherCard;
