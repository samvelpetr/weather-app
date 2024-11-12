import { createContext } from 'react';
import { FavoriteContextType } from '../models/types';

export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);
