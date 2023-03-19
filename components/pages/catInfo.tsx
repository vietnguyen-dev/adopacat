import {
  ScrollView,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useContext } from "react";

import { useRoute } from "@react-navigation/native";

import iCatData from "interfaces/iCataData";

import { FavoritesContext } from "../../context";

const CatInfo = () => {
  const route = useRoute();
  const context = useContext(FavoritesContext);

  const cat = route.params as iCatData;

  const catAlreadyinFavorites = context.favorites.find(
    (item: iCatData) => item.id === cat.id
  );

  const addToFavorites = () => {
    context.addToFavorites(cat);
  };

  const removeFromFavorites = () => {
    context.removeFromFavorites(cat);
  };

  return (
    <ScrollView style={catStyle.container}>
      <Image
        source={{
          uri: `${cat.image.url}`,
        }}
        style={{
          width: 200,
          height: 200,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <Text>{cat.name}</Text>
      <Text>{cat.description}</Text>
      {!catAlreadyinFavorites ? (
        <TouchableOpacity style={catStyle.addButton}>
          <Button
            onPress={addToFavorites}
            title="Add to Favorites"
            color="white"
            accessibilityLabel="Learn more about this purple button"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={catStyle.removeButton}>
          <Button
            onPress={removeFromFavorites}
            title="Remove Favorites"
            color="white"
            accessibilityLabel="Learn more about this purple button"
          />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const catStyle = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
  },
  addButton: {
    backgroundColor: "blue",
  },
  removeButton: {
    backgroundColor: "red",
  },
});

export default CatInfo;
