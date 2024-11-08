import { useState } from "react"
import WeatherPage from "./components/WeatherPage"
import { CityContext } from "./context/context"
import { ICity } from "./models/types"


function App() {
  const [city, setCity] = useState<ICity | undefined>(undefined);
  const changeCity = (obj:ICity):void => {
    setCity(obj);
  }
  console.log(city);
  
  return (
    <>
    <CityContext.Provider value={{city, changeCity}}>
      <WeatherPage />
    </CityContext.Provider>
    </>
  )
}

export default App
