// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";

import { CAT_API_URL, CAT_API_KEY } from "@env";
import iCatData from "../../interfaces/iCataData";

import CarosuelContainer from "../UI/carosuel-container";
import SearchResults from "../UI/search-results";

export default function Home() {
  const [search, setSearch] = useState<string | undefined>("");
  const [cats, setCats] = useState<[] | iCatData[]>([]);
  const [popular, setPopular] = useState<[] | iCatData[]>([]);
  const [nearby, setNearby] = useState<[] | iCatData[]>([]);

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

  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <TextInput
          style={style.textInput}
          onChangeText={setSearch}
          placeholder="Search"
          value={search}
        />
        {search?.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
      {search?.length > 0 ? (
        <SearchResults catData={cats} searchQuery={search} />
      ) : (
        <>
          <CarosuelContainer title="Popular" data={popular} />
          <CarosuelContainer title="Nearby" data={nearby} />
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 45,
    // borderColor: "black",
    // borderWidth: 3,
    height: "95%",
  },
  searchContainer: {
    // display: "flex",
    // justifyContent: "flex-start",
    // alignItems: "center",
    // flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    // borderWidth: 3,
  },
  textInput: {
    width: 330,
    height: 40,
    marginTop: 15,
    borderColor: "#212121",
    borderRadius: 25,
    borderWidth: 2,
    paddingLeft: 10,
  },
});
