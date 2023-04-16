import {
  View,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";

import iCatData from "interfaces/iCataData";
import { useNavigation } from "@react-navigation/native";

interface iSearchResults {
  searchQuery: string;
  catData: iCatData[];
  filterTrait: string;
  inputFocus: boolean;
}

interface iSearchResult {
  catData: iCatData;
}

export const SearchResult = ({ catData }: iSearchResult) => {
  const navigation = useNavigation();

  return (
    <View className="p-4">
      {catData.hasOwnProperty("image") ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cat Info" as never, { ...catData } as never);
          }}
          className="flex flex-row"
        >
          <Image
            source={{ uri: catData.image.url }}
            style={{ width: 50, height: 49 }}
            className="rounded-full"
          />
          <Text className="text-white text-2xl py-2 px-4">{catData.name}</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-white">No Data Available</Text>
      )}
    </View>
  );
};

const SearchResults = ({
  searchQuery,
  filterTrait,
  inputFocus,
  catData,
}: iSearchResults) => {
  const searchedCats = catData.filter((cats) =>
    cats.name.includes(searchQuery!)
  );
  const popularCats = catData.slice(0, 10);
  const nearbyCats = catData.slice(11, 20);
  const filteredCats = catData.filter((cat) => {
    if (cat[filterTrait as keyof iCatData] === 5) {
      return cat;
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {searchQuery.length > 0 && inputFocus && (
        <ScrollView
          keyboardShouldPersistTaps="always"
          onScroll={() => Keyboard.dismiss()}
          scrollEventThrottle={0}
        >
          {searchedCats.map((cat) => (
            <SearchResult key={cat.id} catData={cat} />
          ))}
        </ScrollView>
      )}
      {searchQuery.length === 0 && inputFocus && (
        <ScrollView
          keyboardShouldPersistTaps="always"
          onScroll={() => Keyboard.dismiss()}
          scrollEventThrottle={0}
        >
          <Text className="text-white text-2xl pl-4 pt-4">Popular</Text>
          <View>
            {popularCats.map((cat) => (
              <SearchResult key={cat.id} catData={cat} />
            ))}
          </View>
          <Text className="text-white text-2xl pl-4 pt-4">Nearby</Text>
          {nearbyCats.map((cat) => (
            <SearchResult key={cat.id} catData={cat} />
          ))}
        </ScrollView>
      )}
      {filterTrait.length > 0 && searchQuery.length === 0 && !inputFocus && (
        <ScrollView>
          {filteredCats.map((cat) => (
            <SearchResult key={cat.id} catData={cat} />
          ))}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default SearchResults;
