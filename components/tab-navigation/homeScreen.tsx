import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages";
import CatInfo from "../pages/catInfo";

const Stack = createNativeStackNavigator();

// tab should be root not stack

export default function HomeScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Base"
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Base"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cat Info"
        component={CatInfo}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
