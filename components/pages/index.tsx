// import { StatusBar } from 'expo-status-bar';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";

import { CAT_API_URL, CAT_API_KEY } from "@env";
import iCatData from "../../interfaces/iCataData";

import Page from "../../components/UI/page";
import CarosuelContainer from "../UI/carosuel-container";
import SearchResults from "../UI/results/search-results";
import SearchFilter from "../UI/search-filters";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [cats, setCats] = useState<[] | iCatData[]>([]);
  const [popular, setPopular] = useState<[] | iCatData[]>([]);
  const [nearby, setNearby] = useState<[] | iCatData[]>([]);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");

  useEffect(() => {
    const getCats = async () => {
      try {
        const response = await fetch(CAT_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": CAT_API_KEY,
          },
        });

        const data = await response.json();
        const popularCats = data.slice(0, 10);
        const nearbyCats = data.slice(11, 20);
        setPopular(popularCats);
        setNearby(nearbyCats);
        setCats(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCats();
  }, []);

  const changeSearchFilter = (filter: string) => {
    setSearchFilter(filter);
  };

  const removeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Page>
      <View className="py-16">
        <View className="border-b-2 border-b-gray-600/80 pb-3">
          <View className="flex flex-row px-4 ">
            <TextInput
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor="white"
              value={search}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              className="text-white border-2 border-white py-2 px-4 rounded-full w-full focus:border-blue-400 blur:border-white"
            />
            {inputFocus && (
              <TouchableOpacity
                onPress={() => {
                  setSearch("");
                  Keyboard.dismiss();
                }}
                className="ml-auto bg-blue-400 rounded-full w-50 my-auto px-4 py-2"
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
          {!inputFocus && (
            <SearchFilter
              changeFilter={changeSearchFilter}
              searchFilter={searchFilter}
            />
          )}
        </View>
        {inputFocus && searchFilter === "" ? (
          <SearchResults catData={cats} searchQuery={search} />
        ) : (
          <ScrollView keyboardShouldPersistTaps="always">
            <CarosuelContainer title="Popular" data={popular} />
            <CarosuelContainer title="Nearby" data={nearby} />
          </ScrollView>
        )}
        {searchFilter !== "" && <Text className="text-white">bye</Text>}
      </View>
    </Page>
  );
}
