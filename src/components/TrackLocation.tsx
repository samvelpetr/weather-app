import React, { useContext, useEffect, useState } from 'react';
import { ICity, ICod, Location } from '../models/types';
import { getCity } from '../api/weatherApi';
import { CityContext } from '../context/context';

const UserLocation: React.FC = () => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [userCity, setUserCity] = useState<ICity | undefined>(undefined);
  useEffect(() => {
    let data = sessionStorage.getItem('UserCity') as string;
    if (data) {
      setUserCity(JSON.parse(data) as ICity);
    }
  }, []);
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }
  const { changeCity } = context;
  const changeShowingCity = (obj: ICity) => {
    changeCity(obj);
  };
  const getLocation = () => {
    if (userCity?.name) {
      return;
    }
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      () => {
        setError(
          'Unable to retrieve location. Permission denied or unavailable.'
        );
      }
    );
  };
  useEffect(() => {
    if (location.latitude && location.longitude) {
      const fetchCityName = async () => {
        const data = await getCity(
          location.latitude as number,
          location.longitude as number
        );
        if (data.status == 404) {
          alert('some error');
          return;
        }
        const cityData: ICity = {
          id: data.id as number,
          name: data.name as string,
          wind: data.wind.speed as number,
          temp: data.main.temp as number,
          feelTemp: data.main.feels_like as number,
          pressure: data.main.pressure as number,
          humidity: data.main.humidity as number,
          sunrise: data.sys.sunrise as number,
          sunset: data.sys.sunset as number,
          coord: data.coord as ICod,
          weatherType: {
            main: data.weather[0].main as string,
            icon: data.weather[0].icon as string,
          },
        };
        sessionStorage.setItem('UserCity', JSON.stringify(cityData));
        setUserCity(cityData);
      };
      fetchCityName();
    }
  }, [location.latitude, location.longitude]);

  return (
    <div className="trackLocation">
      <button type="button" onClick={getLocation}>
        Detect My City
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userCity?.name ? (
        <button
          type="button"
          onClick={() => changeShowingCity(userCity as ICity)}
        >
          {userCity.name}
        </button>
      ) : (
        <p>Location not available</p>
      )}
    </div>
  );
};

export default UserLocation;
