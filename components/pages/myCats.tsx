// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { AppContext } from "../../context/index";

import MyCatOrders from "../../components/UI/results/my-cat-order";

export default function MyCats() {
  const context = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View className="py-16 px-4">
      <Text className="text-white text-3xl">My Cats</Text>
      <MyCatOrders catDataArr={context.myCats} />
    </View>
  );
}
