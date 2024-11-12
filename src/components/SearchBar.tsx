import { useContext, useEffect, useState, useCallback } from 'react';
import { CityContext } from '../context/context';
import { ICity } from '../models/types';
import UserLocation from './TrackLocation';
import { useNavigate } from 'react-router-dom';
import { getCityData } from '../utils/cityData';
import { Link } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [inputCity, setInputCity] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cityContext = useContext(CityContext);
  const navigate = useNavigate();

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
    <form className="navbar" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={inputCity}
        placeholder="Enter City name"
      />
      <button type="submit">Search</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <UserLocation />
      <Link to="/favorites" className="favorites-link">
        Favorites
      </Link>
    </form>
  );
};

export default SearchBar;
