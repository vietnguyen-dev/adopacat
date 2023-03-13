import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./components/tab-navigation/homeScreen";
import Custom from "./components/pages/custom";
import Favorites from "./components/pages/favorites";
import MyCats from "./components/pages/myCats";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Custom" component={Custom} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="My Cats" component={MyCats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
