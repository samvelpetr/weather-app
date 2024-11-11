import { getCityWeather } from '../api/weatherApi';
import { ICity, ICod } from '../models/types';

export async function getCityData(
  inputCity: string
): Promise<ICity | undefined> {
  const data = await getCityWeather(inputCity);
  if (data.status == 404) {
    alert('Invalid city name');
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
  return cityData;
}
