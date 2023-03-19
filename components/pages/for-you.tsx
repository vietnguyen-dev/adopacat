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
    <View style={style.container}>
      <Text style={style.title}>For You</Text>
      <Text style={style.title2}>Find specific cats based on your wants</Text>
      <View style={style.formContainer}>
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
          buttonStyle={
            active === 0 ? style.stepperButton : style.stepperButton2
          }
          buttonTextStyle={{ textAlign: "center" }}
          showButton={selectedTraits.length === 5}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 45,
    // borderColor: "black",
    // borderWidth: 1,
    height: "93%",
    // flex: 1,
    // flexDirection: "column",
  },
  formContainer: {
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    // marginTop: "auto",
    flex: 1,
    // flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    // borderWidth: 3,
    // borderColor: "red",
  },
  title: {
    fontSize: 32,
    margin: 15,
  },
  title2: {
    marginLeft: 15,
    fontSize: 16,
  },
  textInput: {
    width: 330,
    height: 40,
    marginTop: 15,
    // borderColor: "#212121",
    borderRadius: 25,
    // borderWidth: 2,
    paddingLeft: 10,
  },
  stepperButton: {
    marginTop: "7%",
    marginLeft: "auto",
    width: "100%",
    flex: 1,
    flexDirection: "column",
  },
  stepperButton2: {
    marginTop: "20%",
    marginLeft: "auto",
    width: "50%",
  },
});
