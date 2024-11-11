import { useEffect, useState } from 'react';
import WeatherPage from './components/WeatherPage';
import { CityContext } from './context/context';
import { ICity } from './models/types';
import './App.css';

function App() {
  const [city, setCity] = useState<ICity | undefined>(undefined);
  const changeCity = (obj: ICity): void => {
    sessionStorage.setItem('currentCity', JSON.stringify(obj));
    setCity(obj);
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
      <CityContext.Provider value={{ city, changeCity }}>
        <WeatherPage />
      </CityContext.Provider>
    </>
  );
}

export default App;
