import axios from "axios";
import { apiKey, geoUrl, wheatherUrl } from "./apiInfo";

export const getCityWeather = async (cityName:string) => {
    try {
            const fetchedData  = await axios.get(geoUrl,{
                params: {
                    q:cityName,
                    appid:apiKey,
                    limit:1,
                }
            });
            if (!fetchedData.data.length){
                throw new Error("Invalid City Name");
            }
            const {lat, lon} = fetchedData.data[0];
        

        const cityInfo = await axios.get(wheatherUrl,{
            params:{
                lat,
                lon,
                appid:apiKey
            }
        });
        return cityInfo.data;
        
    } catch(err) {
        console.log(err);
    }
        
    
}
export const getCity = async (lat:number,lon:number):Promise<string> => {
    try{

        const cityInfo = await axios.get(wheatherUrl,{
            params:{
                lat:lat,
                lon:lon,
                appid:apiKey
            }
        });
        return cityInfo.data.name as string;
    } catch(err) {
        console.log(err);
        return err as string;
    }
}