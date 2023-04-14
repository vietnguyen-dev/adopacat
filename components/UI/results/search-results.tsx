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
  searchQuery: string;
  catData: iCatData[];
}

interface iSearchResult {
  catData: iCatData;
}

export const SearchResult = ({ catData }: iSearchResult) => {
  const navigation = useNavigation();

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
            style={{ width: 50, height: 49 }}
          />
          <Text style={searchStyles.searchName}>{catData.name}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ height: 50 }}>No Data Available</Text>
      )}
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
        {filteredCats.length > 0 ? (
          <FlatList
            data={filteredCats}
            renderItem={({ item }) => <SearchResult catData={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text>No results </Text>
        )}
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
    // zIndex: 2,
    height: "100%",
  },
  searchResult: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "black",
    borderWidth: 1,
    height: 50,
  },
  searchName: {
    position: "relative",
    top: 15,
    left: 10,
  },
});

export default SearchResults;
