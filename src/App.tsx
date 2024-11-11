import { useEffect, useState } from 'react';
import { CityContext } from './context/context';
import { ICity } from './models/types';
import './App.css';
import SearchBar from './components/SearchBar';
import { Route, Routes } from 'react-router-dom';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import FavoriteCities from './components/FavoriteCities';
import WeatherMap from './components/WeatherMap';

function App() {
  const [city, setCity] = useState<ICity | undefined>(undefined);
  const [favorites, setFavorites] = useState<string[]>([]);
  const changeCity = (obj: ICity): void => {
    sessionStorage.setItem('currentCity', JSON.stringify(obj));
    setCity(obj);
  };
  const addToFavorites = (cityName: string): void => {
    setFavorites([...favorites, cityName]);
  };
  const removeFromFavorites = (cityName: string): void => {
    setFavorites(favorites.filter((elm) => elm != cityName));
  };
  useEffect(() => {
    let data = sessionStorage.getItem('currentCity');
    if (data) {
      const city: ICity = JSON.parse(data as string);
      if (city.name) {
        setCity(city);
      }
    }
  }, []);
  return (
    <>
      <CityContext.Provider
        value={{
          city,
          changeCity,
          favorites,
          addToFavorites,
          removeFromFavorites,
        }}
      >
        <SearchBar />
        <Routes>
          <Route path="/:cityName" element={<WeatherCard />} />

          <Route path="/:cityName/week" element={<Forecast />} />
          <Route path="/:cityName/map" element={<WeatherMap />} />
          <Route path="/favorites" element={<FavoriteCities />} />
        </Routes>
      </CityContext.Provider>
    </>
  );
}

export default App;
