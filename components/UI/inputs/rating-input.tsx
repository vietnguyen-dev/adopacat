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
      <Text className="text-white text-2xl text-center pb-3">
        Rate Your Traits
      </Text>
      <Text className="text-white text-xl text-center pb-3">
        Values must be between 1 and 5
      </Text>
      <View className="flex-4">
        {traits.map((item) => (
          <View key={item.id} className="py-3 px-12 flex flex-row">
            <Text className="text-white text-xl w-48">{item.trait}</Text>
            <View className="pt-5 flex flex-row w-28 border-2 border-white justify-evenly">
              <TouchableOpacity>
                <Button
                  onPress={() => setStateValues(item.id, -1)}
                  title="-"
                  color="white"
                  // disabled={!clearDisabled}
                  accessibilityLabel="Learn more about this purple button"
                />
              </TouchableOpacity>
              <Text className="text-white text-center">
                {item.value.toString()}
              </Text>
              <TouchableOpacity>
                <Button
                  onPress={() => setStateValues(item.id, 1)}
                  title="+"
                  color="white"
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
