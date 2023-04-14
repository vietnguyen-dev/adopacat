import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyCats from "../pages/myCats";
import CatInfo from "../pages/catInfo";

const Stack = createNativeStackNavigator();

// tab should be root not stack

export default function MyCatsScreen() {
  return (
    <Stack.Navigator
      initialRouteName="My Cats"
      //   screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="My Cats Page"
        component={MyCats}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cat Info" component={CatInfo} />
    </Stack.Navigator>
  );
}
