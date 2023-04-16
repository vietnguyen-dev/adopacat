// import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Button, Modal } from "react-native";
import { useState, useContext } from "react";

import { AppContext } from "../../context/index";

import FavoritesResults from "../UI/results/favorite-results";
import Page from "../UI/page";

export default function Favorites() {
  const [show, setShow] = useState<boolean>(false);
  const context = useContext(AppContext);

  const clearDisabled = context.favorites.length > 0;

  const modalClose = () => {
    context.clearFavorites();
    setShow(false);
  };

  const showModal = () => {
    setShow(true);
  };

  return (
    <Page>
      <View className="pt-16 px-4 flex flex-row">
        <Text className="text-white text-3xl">Favorites</Text>
        <TouchableOpacity
          activeOpacity={1}
          className={`ml-auto bg-red-600 rounded-md px-4 ${
            clearDisabled || "bg-gray-400"
          }`}
        >
          <Button
            onPress={showModal}
            title="Remove All"
            color="#212121"
            disabled={!clearDisabled}
            accessibilityLabel="Learn more about this purple button"
          />
        </TouchableOpacity>
      </View>
      <FavoritesResults catData={context.favorites} />
      <View>
        <Modal animationType="fade" transparent={true} visible={show}>
          <View className="border-4 border-black h-full bg-[#212121]/50">
            <View className="bg-[#212121] mt-auto h-64 p-4 rounded-t-3xl border-x-2 border-t-2 border-gray-400">
              <TouchableOpacity
                onPress={() => setShow(false)}
                className="ml-auto px-3 py-2 border-2 border-white/50 w-20 rounded-md"
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-white pt-2 text-lg">
                Are you sure you want to clear all your favorites cats?{" "}
              </Text>
              <Text className="text-white pb-3 text-lg">
                This Action is undoable
              </Text>
              <TouchableOpacity className="bg-red-600 mt-3 rounded-md">
                <Button
                  onPress={modalClose}
                  title="Confirm Clear All"
                  color="white"
                  disabled={!clearDisabled}
                  accessibilityLabel="Learn more about this purple button"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Page>
  );
}
