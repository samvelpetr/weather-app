import { useContext, useEffect, useState } from 'react';
import { CityContext } from '../context/context';
import { getForecast } from '../api/weatherApi';
import { ICityForecastItem } from '../models/types';
import ForecastItem from './ForecastItem';
import { useParams } from 'react-router-dom';
import { getCityData } from '../utils/cityData';

const Forecast: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [cityInfo, setCityInfo] = useState<ICityForecastItem[] | null>(null);
  const [chunks, setChunks] = useState<ICityForecastItem[][]>([]);
  const context = useContext(CityContext);

  if (!context) {
    throw new Error('CityContext must be used within a CityProvider');
  }

  const { city, changeCity } = context;

  const chunkArray = (
    data: ICityForecastItem[],
    size: number
  ): ICityForecastItem[][] => {
    const chunksArr = [];
    for (let i = 0; i < data.length; i += size) {
      chunksArr.push(data.slice(i, i + size));
    }
    return chunksArr;
  };

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        if (cityName && cityName !== city?.name) {
          const cityData = await getCityData(cityName);
          if (cityData) {
            changeCity(cityData);
          } else {
            console.error(`City data for "${cityName}" not found.`);
          }
        }
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, [cityName, city, changeCity]);

  useEffect(() => {
    const fetchForecastData = async () => {
      if (city?.name) {
        try {
          const forecastData = await getForecast(city.name);
          const formattedData: ICityForecastItem[] = forecastData.list.map(
            (item: unknown, index: number) => {
              const elm = item as {
                main: { temp: number };
                dt_txt: string;
                weather: [{ main: string; icon: string }];
                wind: { speed: number };
              };
              return {
                id: index,
                temp: elm.main.temp,
                date: elm.dt_txt,
                weather: {
                  main: elm.weather[0].main,
                  icon: elm.weather[0].icon,
                },
                windSpeed: elm.wind.speed,
              };
            }
          );
          setCityInfo(formattedData);
        } catch (error) {
          console.error('Error fetching forecast data:', error);
        }
      }
    };

    fetchForecastData();
  }, [city]);

  useEffect(() => {
    if (cityInfo && cityInfo.length > 0) {
      setChunks(chunkArray(cityInfo, 8));
    }
  }, [cityInfo]);

  return (
    <div className="container">
      {chunks.map((chunk, index) => (
        <ForecastItem items={chunk} key={index} />
      ))}
    </div>
  );
};

export default Forecast;
