import { TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import iCatData from "interfaces/iCataData";

interface iCardPop {
  key: string;
  name: string;
  image_url: string;
  height: number;
  width: number;
}

interface iCard {
  catData: iCatData;
}

const Card = ({ catData }: iCard) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ paddingRight: 30 }}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("CatInfo" as never, { ...catData } as never)
      }
    >
      <Image
        source={{ uri: catData.image.url }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{catData.name}</Text>
    </TouchableOpacity>
  );
};

export default Card;
