import { View, Text, ScrollView, StyleSheet } from "react-native";

import Card from "./card";
import iCatData from "../../interfaces/iCataData";

interface iCarosuelContainer {
  title: string;
  data: [] | iCatData[];
}

const CarosuelContainer = ({ title, data }: iCarosuelContainer) => {
  return (
    <View style={carosuelStyle.carosuelContainer}>
      <Text style={carosuelStyle.titleText}>{title}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.length > 0 ? (
          data.map((cat) => <Card key={cat.id} catData={cat} size={"small"} />)
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const carosuelStyle = StyleSheet.create({
  carosuelContainer: {
    paddHorizontal: 20,
    marginVertical: 20,
    // position: "absolute",
    // top: 0,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default CarosuelContainer;
