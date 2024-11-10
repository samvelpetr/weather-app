import { useContext, useState } from "react";
import { getCityWeather } from "../api/weatherApi";
import { CityContext } from "../context/context";
import { ICity, ICod } from "../models/types";
import UserLocation from "./TrackLocation";

const SearchBar:React.FC = () => {
    const [inputCity,setInputCity] = useState<string>("");
    const cityContext = useContext(CityContext);

    if (!cityContext) {
      throw new Error('CityContext must be used within a CityProvider');
    }
    
    const { changeCity } = cityContext;
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputCity.length == 0 ) {
            alert("Input is empty");
            return;
        }
        const data = await getCityWeather(inputCity);
        
        const cityData:ICity = {
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
                main:data.weather[0].main as string,
                icon: data.weather[0].icon as string
            }
        };
        changeCity(cityData);
    }

    return <>
        <form className="navbar" onSubmit={handleSubmit}>

            <input type="text"
            onChange={(evn) => setInputCity(evn.target.value)}
            value={inputCity}
            placeholder="Enter City name" />
            <button type="submit">Search</button>
            <UserLocation/>
        </form>
    </>
}

export default SearchBar;