import axios from "axios";
import { apiKey, foreCastUrl, wheatherUrl } from "./apiInfo";


export const getForecast =  async (cityName:string) => {
    try {
        const data = await axios.get(foreCastUrl, {
            params: {
                q: cityName,
                appid:apiKey,
            }
        })
        return data.data;
    }catch(err) {
        console.log(err);    
    }
}


export const getCityWeather = async (cityName:string) => {
    try {
            // const fetchedData  = await axios.get(geoUrl,{
            //     params: {
            //         q:cityName,
            //         appid:apiKey,
            //         limit:1,
            //     }
            // });
            // if (!fetchedData.data.length){
            //     throw new Error("Invalid City Name");
            // }
            // const {lat, lon} = fetchedData.data[0];
        

        const cityInfo = await axios.get(wheatherUrl,{
            params:{
                q:cityName,
                appid:apiKey,
                units:"metric"
            }
        });
        return cityInfo.data;
        
    } catch(err) {
        console.log(err);
        return err;
    }
        
    
}
export const getCity = async (lat:number,lon:number) => {
    try{

        const cityInfo = await axios.get(wheatherUrl,{
            params:{
                lat:lat,
                lon:lon,
                appid:apiKey,
            }
        });
        return cityInfo.data;
    } catch(err) {
        console.log(err); 
        return err;
    }
}