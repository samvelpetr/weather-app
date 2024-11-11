import { useContext } from "react";
import { CityContext } from "../context/context";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { apiKey } from "../api/apiInfo";

const WeatherMap = () => {

    const context = useContext(CityContext);
    if (!context) {
        throw new Error('CityContext must be used within a CityProvider');    
    }
    const { city } = context;
    
    const cityCoordinates = [city?.coord.lat, city?.coord.lon]; // Replace with your city's coordinates

  return (
    <MapContainer center={[...cityCoordinates]} zoom={12} style={{ height: "100vh", width: "100%" }}>
    <TileLayer
      url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
      attribution='&copy; <a href="https://openweathermap.org">OpenWeather</a>'
    />
  </MapContainer>
  );
};

export default WeatherMap;
