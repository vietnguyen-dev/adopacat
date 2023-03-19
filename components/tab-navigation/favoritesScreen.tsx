import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Favorites from "../pages/favorites";
import CatInfo from "../pages/catInfo";

const Stack = createNativeStackNavigator();

// tab should be root not stack

export default function FavoritesScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      //   screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Favorites Page"
        component={Favorites}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CatInfo" component={CatInfo} />
    </Stack.Navigator>
  );
}
