import { useState, createContext } from "react";
import iCatData from "interfaces/iCataData";

interface iFavoritesContext {
  favorites: [] | iCatData[];
  addToFavorites: Function;
  removeFromFavorites: Function;
  clearFavorites: Function;
}

const initFavoritesContext = {
  favorites: [],
  addToFavorites: () => null,
  removeFromFavorites: () => null,
  clearFavorites: () => null,
};

export const FavoritesContext =
  createContext<iFavoritesContext>(initFavoritesContext);

interface iComponentWithChildren {
  children: React.ReactNode;
}

const FavoritesContextProvider = ({ children }: iComponentWithChildren) => {
  const [favorites, setFavorites] = useState<[] | iCatData[]>([]);

  const addToFavorites = (obj: iCatData) => {
    setFavorites([...favorites, obj]);
  };

  const removeFromFavorites = (obj: iCatData) => {
    const removed = favorites.filter((item) => item.id !== obj.id);
    setFavorites(removed);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const values = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
