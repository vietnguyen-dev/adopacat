import { useState, createContext } from "react";
import iCatData from "interfaces/iCataData";

interface iAppContext {
  favorites: [] | iCatData[];
  addToFavorites: Function;
  removeFromFavorites: Function;
  clearFavorites: Function;
  myCats: [] | iCatData[];
  addToMyCats: Function;
}

const initAppContext = {
  favorites: [],
  addToFavorites: () => null,
  removeFromFavorites: () => null,
  clearFavorites: () => null,
  myCats: [],
  addToMyCats: () => null,
};

export const AppContext = createContext<iAppContext>(initAppContext);

interface iComponentWithChildren {
  children: React.ReactNode;
}

const AppContextProvider = ({ children }: iComponentWithChildren) => {
  const [favorites, setFavorites] = useState<[] | iCatData[]>([]);
  const [myCats, setmyCats] = useState<[] | iCatData[]>([]);

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

  const addToMyCats = (obj: iCatData) => {
    setmyCats([...myCats, obj]);
  };

  const values = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    myCats,
    addToMyCats,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
