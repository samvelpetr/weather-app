import { createContext } from 'react';
import { CityContextType } from '../models/types';

export const CityContext = createContext<CityContextType | undefined>(
  undefined
);
