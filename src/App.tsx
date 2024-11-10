import { useState } from "react"
import WeatherPage from "./components/WeatherPage"
import { CityContext } from "./context/context"
import { ICity } from "./models/types"
import "./App.css"

function App() {
  const [city, setCity] = useState<ICity | undefined>(undefined);
  const changeCity = (obj:ICity):void => {
    setCity(obj);
  }
  
  return (
    <>
    <CityContext.Provider value={{city, changeCity}}>
      <WeatherPage />
    </CityContext.Provider>
    </>
  )
}

export default App
