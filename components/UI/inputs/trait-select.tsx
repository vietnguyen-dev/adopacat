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

// const staticImage = require("./src/assets/remove.png");
import { traitList, iTraits } from "./traits-list";
import iCatData from "interfaces/iCataData";

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
      <Text style={styles.formTitle}>Trait Select</Text>
      {dropdownDisabled ? (
        <Text style={styles.formText}>Go to Next Step</Text>
      ) : (
        <Text style={styles.formText}>
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
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem.trait;
          }}
          rowTextForSelection={(item) => {
            return item.trait;
          }}
          buttonStyle={styles.selectBox}
        />
      )}
      {traits.map((item, index) => (
        <View key={item.id} style={styles.selectedTrait}>
          <Text style={styles.traitBoxText}>
            {index + 1}. {item.trait}
          </Text>
          <TouchableOpacity
            style={styles.removeTrait}
            onPress={() => deleteTrait(item)}
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

const styles = StyleSheet.create({
  selectedTrait: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 10,
    paddingLeft: "5%",
    paddingRight: "1%",
    paddingVertical: "2%",
    borderRadius: 10,
    height: 55,
  },
  traitBoxText: {
    paddingTop: "3%",
    fontSize: 18,
  },
  removeTrait: {
    marginLeft: "auto",
    // backgroundColor: "red",
    // borderTopRightRadius: 10,
    // borderBottomEndRadius: 10,
    padding: 10,
    borderRadius: 50,
  },
  formTitle: {
    fontSize: 24,
    textAlign: "center",
    padding: "3%",
  },
  formText: {
    fontSize: 15,
    textAlign: "center",
    padding: "3%",
    marginBottom: "5%",
  },
  selectBox: {
    borderWidth: 2,
    borderColor: "black",
    // width: "100%",
    borderRadius: 10,
    marginBottom: "5%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
