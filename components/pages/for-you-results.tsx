import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

import { CAT_API_URL, CAT_API_KEY } from "@env";

import iCatData from "../../interfaces/iCataData";
import { iTraits } from "../UI/inputs/traits-list";
import Card from "../UI/card";

const ForYouResults = () => {
  const [results, setResults] = useState<iCatData[] | []>([]);
  const route = useRoute();
  // const listView = useRef();

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
        let traits = route.params as iTraits[];
        const orderedTraits = traits!.sort((a: iTraits, b: iTraits) => {
          if (a.value < b.value) {
            return 1;
          }
          if (a.value > b.value) {
            return -1;
          }
          return 0;
        });
        const importantTrait: iTraits = orderedTraits[0];
        const traitToFilter = importantTrait.property;
        const data = await response.json();
        const filteredData = data.sort((a: iCatData, b: iCatData) => {
          if (
            a[traitToFilter as keyof iCatData] <
            b[traitToFilter as keyof iCatData]
          ) {
            return 1;
          }
          if (
            a[traitToFilter as keyof iCatData] >
            b[traitToFilter as keyof iCatData]
          ) {
            return -1;
          }
          return 0;
        });
        const cutData = filteredData.splice(0, 20);
        setResults(cutData);
      } catch (err) {
        console.error(err);
      }
    };

    getCats();
  }, []);

  return (
    <View style={resultStyles.container}>
      <Text style={resultStyles.resultsTitle}>For You Results</Text>
      {results.length > 0 ? (
        <View>
          <FlatList
            contentContainerStyle={{ margin: 4 }}
            data={results}
            renderItem={({ item }) => <Card catData={item} size="small" />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            horizontal={false}
          />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const resultStyles = StyleSheet.create({
  container: {
    marginTop: "10%",
    marginBottom: "5%",
  },
  result: {
    margin: "10%",
    borderWidth: 3,
    borderColor: "red",
  },
  resultsTitle: {
    fontSize: 24,
    paddingLeft: "5%",
    paddingVertical: "5%",
  },
});

export default ForYouResults;
