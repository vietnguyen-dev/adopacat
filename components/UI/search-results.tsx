import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";

import iCatData from "interfaces/iCataData";
import { useNavigation } from "@react-navigation/native";

interface iSearchResults {
  searchQuery: string | undefined;
  catData: iCatData[];
}

interface iSearchResult {
  catData: iCatData;
}

const SearchResult = ({ catData }: iSearchResult) => {
  const navigation = useNavigation();

  //   console.log(image);
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CatInfo" as never, { ...catData } as never)
        }
      >
        {catData.image.url && (
          <Image
            source={{ uri: catData.image.url }}
            style={{ width: 50, height: 50 }}
          />
        )}
        <Text>{catData.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SearchResults = ({ searchQuery, catData }: iSearchResults) => {
  const filteredCats = catData.filter((cats) =>
    cats.name.includes(searchQuery!)
  );

  return (
    <View>
      <SafeAreaView style={searchStyles.relative}>
        <FlatList
          data={filteredCats}
          style={searchStyles.searchResult}
          renderItem={({ item }) => <SearchResult catData={item} />}
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
  },
  searchContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    // zIndex: 2,
    height: "100%",
  },
  searchResult: {
    flex: 1,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    height: 50,
  },
});

export default SearchResults;
