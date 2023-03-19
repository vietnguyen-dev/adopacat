import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ForYou from "../pages/for-you";
import ForYouResults from "../pages/for-you-results";
import CatInfo from "../pages/catInfo";

const Stack = createNativeStackNavigator();

export default function ForYouScreen() {
  return (
    <Stack.Navigator
      initialRouteName="For You"
      //   screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="For You Page"
        component={ForYou}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForYouResults"
        component={ForYouResults}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CatInfo" component={CatInfo} />
    </Stack.Navigator>
  );
}
