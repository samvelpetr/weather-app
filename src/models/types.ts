export interface ICity {
    id: number
    name: string
    wind: number
    temp: number
    feelTemp: number
    pressure: number
    humidity: number
    sunrise: number
    sunset: number
    coord: ICod
    weatherType: IWeatherType
}  

export interface ICod {
    lon: number
    lat: number
}
export interface IWeatherType{
    main: string
    icon: string
}

export interface CityContextType {
    city?: ICity 
    changeCity: (city: ICity) => void,
    favorites: string[],
    addToFavorites: (cityName:string) => void
    removeFromFavorites: (cityName:string) => void
}
export interface Location {
    latitude: number | null;
    longitude: number | null;
}


export interface ICityForecastItem {
    id:number,
    date:string,
    temp:number,
    weather:IWeatherType,
    windSpeed:number
}