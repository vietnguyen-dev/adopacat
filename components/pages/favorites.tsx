// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
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
      <View>
        <Text>Favorites</Text>
        <TouchableOpacity activeOpacity={1}>
          <Button
            onPress={showModal}
            title="Remove All"
            color="white"
            disabled={!clearDisabled}
            accessibilityLabel="Learn more about this purple button"
          />
        </TouchableOpacity>
      </View>
      <FavoritesResults catData={context.favorites} />
      <View>
        <Modal animationType="fade" transparent={true} visible={show}>
          <View>
            <View>
              <TouchableOpacity onPress={() => setShow(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <Text>
                Are you sure you want to clear all your favorites cats?{" "}
              </Text>
              <Text>This Action is undoable</Text>
              <TouchableOpacity>
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
