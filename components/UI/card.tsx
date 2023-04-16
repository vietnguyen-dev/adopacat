import { TouchableOpacity, Text, Image, View } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { AppContext } from "../../context";
import iCatData from "interfaces/iCataData";

interface iCard {
  catData: iCatData;
  size: "small" | undefined;
}

const Card = ({ catData, size }: iCard) => {
  const context = useContext(AppContext);
  const navigation = useNavigation();

  const catAlreadyinFavorites = context.favorites.find(
    (item: iCatData) => item.id === catData.id
  );

  const addToFavorites = () => {
    context.addToFavorites(catData);
  };

  const removeFromFavorites = () => {
    context.removeFromFavorites(catData);
  };

  const favorite = () => {
    if (catAlreadyinFavorites) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  const properIcon = catAlreadyinFavorites
    ? "../../assets/heart.png"
    : "../../assets/white-outlined-heart.png";

  return (
    <View className="rounded-lg border-[1px] border-gray-600/80 ml-5">
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate("Cat Info" as never, { ...catData } as never)
        }
      >
        <Image
          source={{ uri: catData.image.url }}
          className="w-48 h-28 rounded-t-lg"
        />

        <View className="pl-2 py-3 w-full bg-[#212121] h-24 rounded-b-xl static">
          <TouchableOpacity onPress={favorite}>
            <View className="px-1.5 py-1.5 border-full w-10 h-10 absolute right-4 -top-9 border-2 border-gray-600/80 rounded-full bg-black">
              {catAlreadyinFavorites ? (
                <Image source={require("../../assets/heart.png")} />
              ) : (
                <Image
                  source={require("../../assets/white-outlined-heart.png")}
                />
              )}
            </View>
          </TouchableOpacity>
          <Text className="text-white text-lg pt-2">{catData.name}</Text>
          <Text className="text-white pt-1 font-extralight">
            {catData.origin}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
