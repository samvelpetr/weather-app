import { useCallback, useEffect, useMemo, useState } from 'react';
import { CityContext } from './context/cityContext';
import { ICity } from './models/types';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import FavoriteCities from './components/FavoriteCities';
import WeatherMap from './components/WeatherMap';
import { FavoriteContext } from './context/favoriteContext';
import SearchBar from './components/SearchBar';

function App() {
  const [city, setCity] = useState<ICity | undefined>(undefined);
  const [favorites, setFavorites] = useState<string[]>([]);

  const changeCity = useCallback((obj: ICity): void => {
    sessionStorage.setItem('currentCity', JSON.stringify(obj));
    setCity(obj);
  }, []);

  const addToFavorites = useCallback((cityName: string): void => {
    setFavorites([...favorites, cityName]);
  }, []);

  const removeFromFavorites = useCallback((cityName: string): void => {
    setFavorites(favorites.filter((elm) => elm != cityName));
  }, []);
  const propsData = useMemo(() => {
    return {
      city,
      changeCity,
    };
  }, [city]);

  const favoritePropsData = useMemo(() => {
    return {
      favorites,
      addToFavorites,
      removeFromFavorites,
    };
  }, [favorites]);
  useEffect(() => {
    const data = sessionStorage.getItem('currentCity');
    if (data) {
      const city: ICity = JSON.parse(data as string);
      if (city.name) {
        setCity(city);
      }
    }
  }, []);

  return (
    <CityContext.Provider value={propsData}>
      <FavoriteContext.Provider value={favoritePropsData}>
        <SearchBar />
        <Routes>
          <Route>
            <Route path="/:cityName" element={<WeatherCard />} />
            <Route path="/:cityName/week" element={<Forecast />} />
            <Route path="/:cityName/map" element={<WeatherMap />} />
            <Route path="/favorites" element={<FavoriteCities />} />
          </Route>
        </Routes>
      </FavoriteContext.Provider>
    </CityContext.Provider>
  );
}

export default App;
