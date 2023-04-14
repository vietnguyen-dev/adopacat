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
    <View>
      {catData.hasOwnProperty("image") ? (
        <TouchableOpacity
          style={searchStyles.searchResult}
          onPress={() =>
            navigation.navigate("Cat Info" as never, { ...catData } as never)
          }
        >
          <Image
            source={{ uri: catData.image.url }}
            style={{
              width: 50,
              height: 49,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
            }}
          />
          <Text style={searchStyles.searchName}>{catData.name}</Text>
          <TouchableOpacity style={searchStyles.removeButton} onPress={remove}>
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
    <View>
      <SafeAreaView style={searchStyles.relative}>
        <FlatList
          data={catData}
          renderItem={({ item }) => <FavoritesResult catData={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const searchStyles = StyleSheet.create({
  relative: {
    position: "relative",
    height: 650,
    top: 10,
  },
  searchContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
  },
  searchResult: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "black",
    borderWidth: 1,
    height: 51,
    borderRadius: 6,
    marginBottom: "5%",
  },
  searchName: {
    position: "relative",
    top: 15,
    left: 10,
  },
  removeButton: {
    marginLeft: "auto",
    borderRadius: 50,
    padding: 10,
  },
});

export default FavoritesResults;
