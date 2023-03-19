import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import iCatData from "interfaces/iCataData";

interface iCard {
  catData: iCatData;
  size: "small" | undefined;
}

const Card = ({ catData, size }: iCard) => {
  const navigation = useNavigation();

  return (
    <View style={size ? cardStyles.cardSM : cardStyles.card}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate("CatInfo" as never, { ...catData } as never)
        }
      >
        <Image
          source={{ uri: catData.image.url }}
          style={size ? cardStyles.cardImageSM : cardStyles.cardImage}
        />
        <Text style={cardStyles.cardText}>{catData.name}</Text>
      </TouchableOpacity>
    </View>
  );
};
const cardStyles = StyleSheet.create({
  card: {
    marginRight: 30,
    borderColor: "rgba(0, 0, 0, .5)",
    borderWidth: 3,
    borderRadius: 25,
  },
  cardImage: {
    width: 200,
    height: 200,
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
