import { View, Text, ScrollView, StyleSheet } from "react-native";

import Card from "./card";
import iCatData from "../../interfaces/iCataData";

interface iCarosuelContainer {
  title: string;
  data: [] | iCatData[];
}

const CarosuelContainer = ({ title, data }: iCarosuelContainer) => {
  return (
    <View className="pt-10">
      <Text className="pt-6 pl-6 text-white text-4xl">{title}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.length > 0 ? (
          data.map((cat) => <Card key={cat.id} catData={cat} size={"small"} />)
        ) : (
          <Text className="pt-6 pl-6 text-white">Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default CarosuelContainer;
