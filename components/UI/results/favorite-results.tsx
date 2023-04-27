import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useContext } from "react";

import iCatData from "interfaces/iCataData";
import { useNavigation } from "@react-navigation/native";

import { AppContext } from "../../../context";

interface iFavoritesList {
  catData: iCatData[];
}

interface iFavorite {
  catData: iCatData;
}

export const FavoritesResult = ({ catData }: iFavorite) => {
  const context = useContext(AppContext);
  const navigation = useNavigation();

  const remove = () => {
    context.removeFromFavorites(catData);
  };

  return (
    <View className="mx-4 mb-3 border-[1px] border-gray-400/80 rounded-md">
      {catData.hasOwnProperty("image") ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Cat Info" as never, { ...catData } as never)
          }
          className="flex flex-row"
        >
          <Image
            source={{ uri: catData.image.url }}
            className="w-14 h-14 basis-1/8 rounded-l-md"
          />
          <Text className="basis-8/12 pl-3 text-white text-xl pt-3">
            {catData.name}
          </Text>
          <TouchableOpacity
            onPress={remove}
            className="basis-1/8 justify-center ml-auto mr-3"
          >
            <Image
              source={require("../../../assets/remove.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <Text style={{ height: 50 }}>No Data Available</Text>
      )}
    </View>
  );
};

const FavoritesResults = ({ catData }: iFavoritesList) => {
  return (
    <View className="pt-3">
      <SafeAreaView>
        <FlatList
          data={catData}
          renderItem={({ item }) => <FavoritesResult catData={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

export default FavoritesResults;
