import { useContext, useEffect } from 'react';
import { CityContext } from '../context/context';
import { imageUrl, imageUrlEnd } from '../api/apiInfo';
import { getForecast } from '../api/weatherApi';
import WeatherMap from './WeatherMap';

const WeatherCard: React.FC = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }
  const { city } = context;
  useEffect(() => {
    if (city?.name) {
      getForecast(city?.name as string).then((resp) => {
        console.log(resp);
      });
    }
  }, [city]);

  return (
    <>
      <h1>{city?.name}</h1>

      <div className="card">
        <div className="left-side">
          <h3>{city?.temp}°C</h3>
          <h4>Feels like: {city?.feelTemp}°C </h4>
          <p>
            Sunrise - {new Date((city?.sunrise as number) * 1000).getHours()}:{' '}
            {new Date((city?.sunrise as number) * 1000).getMinutes()}{' '}
          </p>
          <p>
            Sunset - {new Date((city?.sunset as number) * 1000).getHours()}:{' '}
            {new Date((city?.sunset as number) * 1000).getMinutes()}{' '}
          </p>
          <p className="weather-type">
            Weather Type - {city?.weatherType.main}{' '}
            <img src={imageUrl + city?.weatherType.icon + imageUrlEnd} alt="" />
          </p>
          <p>Wind speed - {city?.wind}meter/sec</p>
          <p>Humidity - {city?.humidity}%</p>
        </div>
      </div>

      <a>5 Day Forecast</a>
      {/* {city && <WeatherMap /> } */}
    </>
  );
};
export default WeatherCard;
