import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
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

const SearchResults = ({ searchQuery, catData }: iSearchResults) => {
  const filteredCats = catData.filter((cats) =>
    cats.name.includes(searchQuery!)
  );

  const popularCats = catData.slice(0, 10);
  const nearbyCats = catData.slice(11, 20);

  return (
    <KeyboardAvoidingView className="h-5/6">
      {searchQuery.length > 0 ? (
        <ScrollView keyboardShouldPersistTaps="always">
          {filteredCats.map((cat) => (
            <SearchResult key={cat.id} catData={cat} />
          ))}
        </ScrollView>
      ) : (
        <ScrollView>
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
    </KeyboardAvoidingView>
  );
};

export default SearchResults;
