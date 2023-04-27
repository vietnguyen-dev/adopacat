// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Alert } from "react-native";
import { useState } from "react";

import Stepper from "react-native-stepper-ui";
import { useNavigation } from "@react-navigation/native";

import { iTraits } from "components/UI/inputs/traits-list";
import TraitSelect from "../UI/inputs/trait-select";
import RatingInput from "../UI/inputs/rating-input";

export default function ForYou() {
  const [active, setActive] = useState<number>(0);
  const [selectedTraits, setSelectedTraits] = useState<iTraits[] | []>([]);
  const navigation = useNavigation();

  const addTrait = (trait: iTraits) => {
    const newArr = [...selectedTraits, trait];
    setSelectedTraits(newArr);
  };

  const deleteTrait = (trait: iTraits) => {
    const deleted = selectedTraits.filter(
      (item) => item.property !== trait.property
    );
    setSelectedTraits(deleted);
  };

  const goToNextStep = () => {
    const ableToMove = selectedTraits.length === 5;
    if (ableToMove) {
      setActive((p) => p + 1);
    } else {
      Alert.alert(
        "Choose Traits",
        "Please choose five traits before continuing",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  const content: JSX.Element[] = [
    <TraitSelect
      traits={selectedTraits}
      addTrait={addTrait}
      deleteTrait={deleteTrait}
    />,
    <RatingInput traits={selectedTraits} setValues={setSelectedTraits} />,
  ];

  return (
    <View className="py-16 px-4">
      <Text className="text-3xl text-white">For You</Text>
      <Text className="text-white py-4">
        Find specific cats based on your wants
      </Text>
      <View>
        <Stepper
          active={active}
          content={content}
          onBack={() => setActive((p) => p - 1)}
          onFinish={() => {
            navigation.navigate(
              "ForYouResults" as never,
              selectedTraits as never
            );
          }}
          onNext={goToNextStep}
          showButton={selectedTraits.length === 5}
        />
      </View>
    </View>
  );
}
