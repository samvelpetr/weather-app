import { useContext, useEffect, useState } from 'react';
import { CityContext } from '../context/cityContext';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { apiKey } from '../api/apiInfo';
import { getCityData } from '../utils/cityData';
import { useParams } from 'react-router-dom';

const WeatherMap: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [cityCoordinates, setCityCoordinates] = useState<number[] | null>(null);
  const context = useContext(CityContext);

  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }

  const { city, changeCity } = context;

  useEffect(() => {
    if (cityName !== city?.name) {
      getCityData(cityName as string).then((resp) => {
        if (resp) {
          changeCity(resp);
        }
      });
    } else if (city?.coord) {
      setCityCoordinates([city.coord.lat, city.coord.lon]);
    }
  }, [city, cityName]);

  return cityCoordinates ? (
    <MapContainer
      center={cityCoordinates}
      zoom={12}
      style={{ height: '800px', width: '100%' }}
    >
      <TileLayer
        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
      />
    </MapContainer>
  ) : (
    <p>Loading map...</p>
  );
};

export default WeatherMap;
