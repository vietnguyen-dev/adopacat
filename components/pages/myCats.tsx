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
    <View style={myCatsStyle.container}>
      <Text style={myCatsStyle.title}>My Cats</Text>
      <MyCatOrders catDataArr={context.myCats} />
    </View>
  );
}

const myCatsStyle = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 55,
    // borderColor: "black",
    // borderWidth: 1,
    height: "90%",
  },
  title: {
    fontSize: 32,
  },
});
