// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  // StatusBar,
} from "react-native";
import { useState, useEffect } from "react";

import Page from "../../components/UI/page";

import { CAT_API_URL, CAT_API_KEY } from "@env";
import iCatData from "../../interfaces/iCataData";

import CarosuelContainer from "../UI/carosuel-container";
import SearchResults from "../UI/results/search-results";

export default function Home() {
  const [search, setSearch] = useState<string>("");
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

  const removeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Page>
      <TouchableWithoutFeedback onPress={removeKeyboard}>
        <View style={style.container}>
          <View style={style.searchContainer}>
            <TextInput
              style={
                search.length > 0 ? style.textInputActive : style.textInput
              }
              onChangeText={setSearch}
              placeholder="Search"
              // onEndEditing={removeKeyboard}
              value={search}
            />
            {search?.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearch("")}
                style={style.cancelButton}
              >
                <Text style={{ textAlign: "center", paddingTop: "4%" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {search?.length !== 0 ? (
            <SearchResults catData={cats} searchQuery={search} />
          ) : (
            <>
              <CarosuelContainer title="Popular" data={popular} />
              <CarosuelContainer title="Nearby" data={nearby} />
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Page>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 45,
    height: "93%",
  },
  searchContainer: {
    alignSelf: "center",
    flexDirection: "row",
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
  textInputActive: {
    width: 300,
    height: 40,
    marginTop: 15,
    borderColor: "#212121",
    borderRadius: 25,
    borderWidth: 2,
    paddingLeft: 10,
    // marginRight: 'auto'
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: "#212121",
    borderRadius: 25,
    width: 70,
    height: 30,
    textAlign: "center",
    marginTop: 20,
    marginLeft: 5,
  },
});
