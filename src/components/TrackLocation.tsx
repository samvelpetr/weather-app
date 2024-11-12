import React, { useContext, useEffect, useState } from 'react';
import { ICity, ICod, Location } from '../models/types';
import { getCity } from '../api/weatherApi';
import { CityContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

const UserLocation: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [userCity, setUserCity] = useState<ICity | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  const context = useContext(CityContext);
  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }
  const { changeCity } = context;

  useEffect(() => {
    const data = sessionStorage.getItem('UserCity');
    if (data) {
      setUserCity(JSON.parse(data) as ICity);
    }
  }, []);

  const changeShowingCity = (obj: ICity) => {
    changeCity(obj);
    navigate(`/${obj.name}`);
  };

  const getLocation = () => {
    if (userCity?.name) {
      return;
    }
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true); // Start loading

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
        setIsLoading(false); // Stop loading when location is retrieved
      },
      () => {
        setError(
          'Unable to retrieve location. Permission denied or unavailable.'
        );
        setIsLoading(false); // Stop loading if there's an error
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
        if (data.status === 404) {
          alert('some error');
          return;
        }
        const cityData: ICity = {
          id: data.id,
          name: data.name,
          wind: data.wind.speed,
          temp: data.main.temp,
          feelTemp: data.main.feels_like,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          coord: data.coord,
          weatherType: {
            main: data.weather[0].main,
            icon: data.weather[0].icon,
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
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <button type="button" onClick={getLocation}>
          Detect My City
        </button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userCity?.name ? (
        <button type="button" onClick={() => changeShowingCity(userCity)}>
          {userCity.name}
        </button>
      ) : (
        <p>Location not available</p>
      )}
    </div>
  );
};

export default UserLocation;
