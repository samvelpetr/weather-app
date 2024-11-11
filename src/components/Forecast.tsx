import { useContext, useEffect, useState } from 'react';
import { CityContext } from '../context/context';
import { getForecast } from '../api/weatherApi';
import { ICityForecastItem } from '../models/types';
import ForecastItem from './ForecastItem';
import { useParams } from 'react-router-dom';
import { getCityData } from '../utils/cityData';

const Forecast: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [cityInfo, setCityInfo] = useState<ICityForecastItem[]>();
  const context = useContext(CityContext);
  const [chunks, setChunks] = useState<ICityForecastItem[][]>([[]]);

  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }
  const { city, changeCity } = context;
  useEffect(() => {
    if (cityName != city?.name) {
      getCityData(cityName as string).then((resp) => {
        if (resp) {
          changeCity(resp);
        }
      });
    }
    if (city?.name) {
      getForecast(city.name).then((resp) => {
        let arr: ICityForecastItem[] = resp.list.map(
          (elm: any, index: number) => {
            return {
              id: index,
              temp: elm.main.temp,
              date: elm.dt_txt,
              weather: {
                main: elm.weather[0].main,
                icon: elm.weather[0].icon,
              },
              windSpeed: elm.wind.speed,
            } as ICityForecastItem;
          }
        );
        setCityInfo(arr);
      });
    }
  }, [city]);
  useEffect(() => {
    if (cityInfo?.length) {
      let chunksArr = [];
      for (let i = 0; i < cityInfo.length; i += 8) {
        chunksArr.push(cityInfo.slice(i, i + 8));
      }
      setChunks(chunksArr);
    }
  }, [cityInfo]);
  return (
    <div className="container">
      {chunks.length > 1 &&
        chunks.map((item, index) => {
          return <ForecastItem items={item} key={index} />;
        })}
    </div>
  );
};

export default Forecast;
