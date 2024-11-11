import { imageUrl, imageUrlEnd } from '../api/apiInfo';
import { ICityForecastItem } from '../models/types';

interface IProps {
  items: ICityForecastItem[];
}

const ForecastItem: React.FC<IProps> = ({ items }) => {
  return (
    <div className="forecast-item">
      <h3>{items[0].date.substring(5, 10)}</h3>
      {items.map((elm) => (
        <div key={elm.id} className="time-entry">
          <p>
            <span>Time:</span> {elm.date.substring(11, 16)}
          </p>
          <p className="forecast-temp">
            <span>Temp:</span> {elm.temp}°C
          </p>
          <p>
            <span>Wind:</span> {elm.windSpeed} meter/sec
          </p>
          <p className="weather-type">
            <span>Weather Type:</span> {elm.weather.main}
            <img
              src={imageUrl + elm.weather.icon + imageUrlEnd}
              alt={elm.weather.main}
            />
          </p>
        </div>
      ))}
    </div>
  );
};
export default ForecastItem;
