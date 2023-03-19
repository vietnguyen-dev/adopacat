import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FavoritesContextProvider from "./context";

import HomeScreen from "./components/tab-navigation/homeScreen";
import FavoritesScreen from "./components/tab-navigation/favoritesScreen";
import ForYouScreen from "./components/tab-navigation/forYouScreen";
import MyCats from "./components/pages/myCats";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FavoritesContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="For You" component={ForYouScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="My Cats" component={MyCats} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesContextProvider>
  );
}
