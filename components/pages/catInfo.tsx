import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";

import { useRoute, useNavigation } from "@react-navigation/native";

import iCatData from "interfaces/iCataData";
import { iImage, iWeight } from "interfaces/iCataData";
import { AppContext } from "../../context";
import Page from "../UI/page";
import { traitList } from "../UI/inputs/traits-list";

interface iStarAmount {
  num: number | string | iImage | iWeight;
}

const StarAmount = ({ num }: iStarAmount) => {
  if (typeof num === "number") {
    if (num > 0) {
      const starElements = Array.from({ length: num }, (_, index) => (
        <Text key={index}>⭐</Text>
      ));
      return <View className="flex flex-row">{starElements}</View>;
    } else if (num === 0) {
      return (
        <View className="flex flex-row">
          <Text className="text-white">None</Text>
        </View>
      );
    }
  }
  //only here to satisfy typescript type, there should be a much better way to do this
  else {
    return (
      <View>
        <Text>None</Text>
      </View>
    );
  }
};

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
      <ScrollView className="p-4">
        <View className="grid place-items-center grid-cols-3">
          <Image
            source={{
              uri: `${cat.image.url}`,
            }}
            className="w-100 h-64 rounded-lg"
          />
        </View>
        <Text className="text-white text-xl pt-5 pb-2">{cat.name}</Text>
        <Text className="text-white text-md">{cat.description}</Text>
        <Text className="text-white text-xl pt-5 pb-2">Main Traits: </Text>
        <Text className="text-white text-md">{cat.temperament}</Text>
        <Text className="text-white text-xl pt-5 pb-3">Weight:</Text>
        <Text className="text-white text-md">{cat.weight.imperial} lbs</Text>
        {!catAlreadyinFavorites ? (
          <TouchableOpacity className="rounded-md bg-blue-400 my-4 mt-10 text-[#212121]">
            <Button
              onPress={addToFavorites}
              title="Add to Favorites"
              color="#212121"
              accessibilityLabel="Learn more about this purple button"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="rounded-md bg-red-600 my-4 mt-10 text-[#212121]">
            <Button
              onPress={removeFromFavorites}
              title="Remove Favorites"
              color="#212121"
              accessibilityLabel="Learn more about this purple button"
            />
          </TouchableOpacity>
        )}
        {!catAlreadyinMyCats && (
          <TouchableOpacity className="rounded-md bg-blue-400 my-2">
            <Button
              onPress={addToMyCats}
              title="Order Now"
              color="#212121"
              accessibilityLabel="Learn more about this purple button"
            />
          </TouchableOpacity>
        )}
        <View className="p-5 ">
          {traitList.map((trait) => (
            <View key={trait.id} className="mb-8">
              <Text className="text-white text-lg pb-3">{trait.trait}</Text>
              <StarAmount num={cat[trait.property as keyof iCatData]} />
            </View>
          ))}
        </View>
      </ScrollView>
    </Page>
  );
};

export default CatInfo;
