import { useContext, useEffect } from "react";
import { CityContext } from "../context/context";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = () => {

    const context = useContext(CityContext);
    if (!context) {
        throw new Error('CityContext must be used within a CityProvider');    
    }
    const { city } = context;
    
    const cityCoordinates = [city?.coord.lat, city?.coord.lon]; // Replace with your city's coordinates

  return (
    <MapContainer center={cityCoordinates} zoom={12} style={{ width: '100%', height: '600px' }}>
      <TileLayer
        url="https://maps.openweathermap.org/maps/2.0/weather/1h/{op}/{z}/{x}/{y}?appid=807f633597df2a30822b404bc6bfbd88&overzoom=true&palette=default"
        />
        </MapContainer>
  );
};

export default WeatherMap;
