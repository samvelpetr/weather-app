import { useContext, useEffect, useState } from 'react';
import { getCityWeather } from '../api/weatherApi';
import { CityContext } from '../context/context';
import { ICity, ICod } from '../models/types';
import UserLocation from './TrackLocation';
import { useNavigate } from 'react-router-dom';
import { getCityData } from '../utils/cityData';
import { Link } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [inputCity, setInputCity] = useState<string>('');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputCity.length == 0) {
      alert('Input is empty');
      return;
    }
    const cityData = await getCityData(inputCity);
    if (cityData) {
      changeCity(cityData as ICity);
      navigate(`/${cityData.name}`);
    }
  };

  return (
    <>
      <form className="navbar" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(evn) => setInputCity(evn.target.value)}
          value={inputCity}
          placeholder="Enter City name"
        />
        <button type="submit">Search</button>
        <UserLocation />
        <Link to="/favorites" className="favorites-link">
          Favorites
        </Link>
      </form>
    </>
  );
};

export default SearchBar;
