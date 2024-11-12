import { useContext, useEffect, useState, useCallback, memo } from 'react';
import { CityContext } from '../context/cityContext';
import { ICity } from '../models/types';
import UserLocation from './TrackLocation';
import { useNavigate } from 'react-router-dom';
import { getCityData } from '../utils/cityData';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import styles from '../styles';

const useStyles = createUseStyles(styles);

const SearchBar: React.FC = memo(() => {
  const [inputCity, setInputCity] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cityContext = useContext(CityContext);
  const navigate = useNavigate();
  const classes = useStyles();

  if (!cityContext) {
    throw new Error('CityContext must be used within a CityProvider');
  }

  const { city, changeCity } = cityContext;

  useEffect(() => {
    if (city?.name) {
      setInputCity(city.name);
    }
  }, [city]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputCity(event.target.value);
      setErrorMessage(null);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputCity.trim().length === 0) {
      setErrorMessage('Please enter a city name.');
      return;
    }
    try {
      const cityData = await getCityData(inputCity);
      if (cityData) {
        changeCity(cityData as ICity);
        navigate(`/${cityData.name}`);
        setErrorMessage(null);
      } else {
        setErrorMessage('City not found. Please try another name.');
      }
    } catch (error) {
      setErrorMessage('Failed to retrieve city data. Please try again.');
      console.error(error);
    }
  };

  return (
    <form className={classes.navbar} onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={inputCity}
        placeholder="Enter City name"
      />
      <button type="submit">Search</button>
      {errorMessage && <p>{errorMessage}</p>}
      <UserLocation />
      <Link to="/favorites" className={classes.favoritesLink}>
        Favorites
      </Link>
    </form>
  );
});

export default SearchBar;
