import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  Image,
} from "react-native";

import SelectDropdown from "react-native-select-dropdown";

import { traitList, iTraits } from "./traits-list";

interface iTraitSelect {
  traits: [] | iTraits[];
  addTrait: Function;
  deleteTrait: Function;
}

const TraitSelect = ({ traits, addTrait, deleteTrait }: iTraitSelect) => {
  const sameTraitMessage = () => {
    Alert.alert(
      "Same Trait Chosen",
      "Please do not choose a duplicate message",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  const dropdownDisabled = traits.length === 5;

  return (
    <View>
      <Text className="text-white text-2xl text-center pb-3">Trait Select</Text>
      {dropdownDisabled ? (
        <Text className="text-white text-xl text-center pb-3">
          Go to Next Step
        </Text>
      ) : (
        <Text className="text-white text-xl text-center pb-3">
          Choose your top five traits in order
        </Text>
      )}
      {!dropdownDisabled && (
        <SelectDropdown
          data={traitList}
          onSelect={(selectedItem: iTraits) => {
            const hasTrait = traits.includes(selectedItem as never);
            if (hasTrait) {
              sameTraitMessage();
            } else {
              addTrait(selectedItem);
            }
          }}
          buttonStyle={{
            backgroundColor: "rgb(33, 33, 33)",
            borderWidth: 2,
            borderColor: "white",
            marginBottom: "5%",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          buttonTextStyle={{
            color: "white",
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem.trait;
          }}
          rowTextForSelection={(item) => {
            return item.trait;
          }}
        />
      )}
      {traits.map((item, index) => (
        <View
          key={item.id}
          className="p-4 flex flex-row border-2 border-white my-2 rounded-lg"
        >
          <Text className="text-white text-xl">
            {index + 1}. {item.trait}
          </Text>
          <TouchableOpacity
            onPress={() => deleteTrait(item)}
            className="ml-auto"
          >
            <Image
              source={require("../../../assets/remove.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default TraitSelect;
