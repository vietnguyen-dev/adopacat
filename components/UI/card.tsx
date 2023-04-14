import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import iCatData from "interfaces/iCataData";

interface iCard {
  catData: iCatData;
  size: "small" | undefined;
}

const Card = ({ catData, size }: iCard) => {
  const navigation = useNavigation();
  const cardClass = size === "small" ? "text-white m-4" : "text-white m-4 ";

  return (
    <View className={"m-4 border-2 border-white"}>
      <TouchableOpacity
        // activeOpacity={1}
        onPress={() =>
          navigation.navigate("Cat Info" as never, { ...catData } as never)
        }
      >
        <Image source={{ uri: catData.image.url }} className="w-40 h-48" />
        <Text className="text-white pl-5 py-3 text-xl">{catData.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
const cardStyles = StyleSheet.create({
  cardImage: {
    width: 250,
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardSM: {
    margin: 10,
    borderColor: "rgba(0, 0, 0, .5)",
    borderWidth: 3,
    borderRadius: 25,
  },
  cardImageSM: {
    width: 160,
    height: 150,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  cardText: {
    textAlign: "center",
    padding: 5,
  },
});

export default Card;
