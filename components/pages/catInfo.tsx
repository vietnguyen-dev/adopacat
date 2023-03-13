import {
  ScrollView,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useRoute } from "@react-navigation/native";

import iCatData from "interfaces/iCataData";

const CatInfo = () => {
  const route = useRoute();

  const cat = route.params as iCatData;

  const addToFavorites = () => {
    console.log("added");
  };

  return (
    <ScrollView>
      <Image
        source={{
          uri: `${cat.image.url}`,
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{cat.name}</Text>
      <Text>{cat.description}</Text>
      <TouchableOpacity style={catStyle.addButton}>
        <Button
          onPress={addToFavorites}
          title="Add to Favorites"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const catStyle = StyleSheet.create({
  addButton: {
    backgroundColor: "red",
  },
});

export default CatInfo;
