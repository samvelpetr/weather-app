import React, { useEffect, useState } from 'react';
import { Location } from '../models/types';
import { getCity } from '../api/weatherApi';



const UserLocation: React.FC =  () => {
    
    const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
    const [error, setError] = useState<string | null>(null);
    const [city,setCity] = useState<string>(() => {
        return localStorage.getItem('cityName') || '';
      });
    useEffect(() => {
        let cityname = localStorage.getItem('cityName') as string;
        setCity(cityname);
    }, [])
    const getLocation =  () => {
        if(city){
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
                longitude: position.coords.longitude
                });
                setError(null); 
                
            },
            () => {
                setError('Unable to retrieve location. Permission denied or unavailable.');
            }
        );
    };
    useEffect(() => {
        if (location.latitude && location.longitude) {
          const fetchCityName = async () => {
            const cityName = await getCity(location.latitude as number, location.longitude as number);
            setCity(cityName);
            localStorage.setItem('cityName', cityName);

          };
          fetchCityName();
        }
    }, [location.latitude, location.longitude]);
    

  return (
    <div className='trackLocation'>
      <button type='button' onClick={getLocation}>Detect My City</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {city ? (
        <button type='button'>{city}</button>
      ) : (
        <p>Location not available</p>
      )}
    </div>
  );
};

export default UserLocation;
