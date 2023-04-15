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
    <View className={"m-4 rounded-2xl border-2 border-gray-600/80"}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate("Cat Info" as never, { ...catData } as never)
        }
      >
        <Image
          source={{ uri: catData.image.url }}
          className="w-48 h-28 rounded-t-2xl"
        />
        <View className="pl-5 py-3 w-full bg-[#212121] h-20 rounded-b-2xl">
          <Text className="text-white text-xl">{catData.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
