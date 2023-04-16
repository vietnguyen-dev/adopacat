import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useContext } from "react";

import { useRoute, useNavigation } from "@react-navigation/native";

import iCatData from "interfaces/iCataData";

import { AppContext } from "../../context";

import Page from "../UI/page";

const CatInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const context = useContext(AppContext);

  const cat = route.params as iCatData;

  const catAlreadyinFavorites = context.favorites.find(
    (item: iCatData) => item.id === cat.id
  );

  const catAlreadyinMyCats = context.myCats.find(
    (item: iCatData) => item.id === cat.id
  );

  const addToFavorites = () => {
    context.addToFavorites(cat);
  };

  const removeFromFavorites = () => {
    context.removeFromFavorites(cat);
  };

  const addToMyCats = () => {
    context.addToMyCats(cat);
    navigation.navigate(
      "My Cats" as never,
      { screen: "My Cats Page" } as never
    );
  };

  return (
    <Page>
      <ScrollView style={catStyle.container}>
        <View style={catStyle.imageContainer}>
          <Image
            source={{
              uri: `${cat.image.url}`,
            }}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
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
        {!catAlreadyinMyCats && (
          <TouchableOpacity style={catStyle.addButton}>
            <Button
              onPress={addToMyCats}
              title="Order Now"
              color="white"
              accessibilityLabel="Learn more about this purple button"
            />
          </TouchableOpacity>
        )}
      </ScrollView>
    </Page>
  );
};

const catStyle = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
    padding: "5%",
  },
  imageContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  addButton: {
    backgroundColor: "blue",
    marginBottom: "5%",
  },
  removeButton: {
    backgroundColor: "red",
    marginBottom: "5%",
  },
});

export default CatInfo;
