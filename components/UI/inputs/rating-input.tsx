import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";

import { iTraits } from "./traits-list";

interface iRatingComponent {
  traits: iTraits[] | [];
  setValues: Function;
}

const RatingInput = ({ traits, setValues }: iRatingComponent) => {
  const setStateValues = (id: number, num: number) => {
    setValues(() => {
      return traits.map((item) => {
        if (item.id === id) {
          const newValue = item.value + num;
          if (newValue >= 1 && newValue <= 5) {
            item.value += num;
          } else {
            Alert.alert("Invalid Value", "Value must be between 1 - 5", [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          }
        }
        return item;
      });
    });
  };

  return (
    <View>
      <Text style={styles.formTitle}>Rate Your Traits</Text>
      <Text style={styles.formText}>Values must be between 1 and 5</Text>
      <View style={styles.traitContainer}>
        {traits.map((item) => (
          <View key={item.id} style={styles.ratingInput}>
            <Text style={styles.ratingText}>{item.trait}</Text>
            <View style={styles.ratingBox}>
              <TouchableOpacity style={styles.ratingButton}>
                <Button
                  onPress={() => setStateValues(item.id, -1)}
                  title="-"
                  color="black"
                  // disabled={!clearDisabled}
                  accessibilityLabel="Learn more about this purple button"
                />
              </TouchableOpacity>
              <Text style={styles.ratingNumber}>{item.value.toString()}</Text>
              <TouchableOpacity style={styles.ratingButton}>
                <Button
                  onPress={() => setStateValues(item.id, 1)}
                  title="+"
                  color="black"
                  // disabled={!clearDisabled}
                  accessibilityLabel="Learn more about this purple button"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RatingInput;

const styles = StyleSheet.create({
  traitContainer: {
    // borderWidth: 1,
    // borderColor: "black",
    flex: 4,
  },
  ratingInput: {
    paddingVertical: "1%",
    paddingHorizontal: "3%",
    marginBottom: "5%",
    flexDirection: "row",
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
  textVerticalAlign: {
    flex: 1,
    justifyContent: "center",
  },
  ratingText: {
    fontSize: 20,
    flex: 2,
    paddingTop: "3%",
  },
  ratingNumber: {
    fontSize: 20,
    paddingHorizontal: "5%",
    paddingTop: "3%",
    width: 35,
    textAlign: "center",
  },
  ratingBox: {
    // borderWidth: 2,
    // borderColor: "black",
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  ratingButton: {
    borderWidth: 1,
    borderColor: "black",
    width: 35,
    height: 35,
    borderRadius: 6,
    // te
  },
});
