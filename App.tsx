import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

import AppContextProvider from "./context";

import HomeScreen from "./components/tab-navigation/homeScreen";
import FavoritesScreen from "./components/tab-navigation/favoritesScreen";
import ForYouScreen from "./components/tab-navigation/forYouScreen";
import MyCatsScreen from "./components/tab-navigation/myCatsScreen";

const MyTheme = {
  dark: false,
  colors: {
    primary: "white",
    background: "rgb(33, 33, 33)",
    card: "rgb(33, 33, 33)",
    text: "white",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
          backBehavior="none"
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="For You" component={ForYouScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="My Cats" component={MyCatsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}
