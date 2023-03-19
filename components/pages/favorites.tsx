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

import { FavoritesContext } from "../../context/index";

import FavoritesResults from "../UI/results/favorite-results";

export default function Favorites() {
  const [show, setShow] = useState<boolean>(false);
  const context = useContext(FavoritesContext);

  const clearDisabled = context.favorites.length > 0;

  const modalClose = () => {
    context.clearFavorites();
    setShow(false);
  };

  const showModal = () => {
    setShow(true);
  };

  return (
    <View style={favoritesStyles.container}>
      <View style={favoritesStyles.titleContainer}>
        <Text style={favoritesStyles.title}>Favorites</Text>
        <TouchableOpacity
          activeOpacity={1}
          style={
            clearDisabled
              ? favoritesStyles.clearButton
              : favoritesStyles.clearButtonDisabled
          }
        >
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
          <View style={favoritesStyles.modalOuterView}>
            <View style={favoritesStyles.modalView}>
              <TouchableOpacity
                style={favoritesStyles.cancelButton}
                onPress={() => setShow(false)}
              >
                <Text style={{ textAlign: "center" }}>Cancel</Text>
              </TouchableOpacity>
              <Text style={favoritesStyles.modalText}>
                Are you sure you want to clear all your favorites cats?{" "}
              </Text>
              <Text style={favoritesStyles.modalText}>
                This Action is undoable
              </Text>
              <TouchableOpacity style={favoritesStyles.clearConfirmButton}>
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
    </View>
  );
}

const favoritesStyles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 55,
    // borderColor: "black",
    // borderWidth: 1,
    height: "90%",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "flex-end",
  },
  title: {
    fontSize: 32,
  },
  clearButton: {
    backgroundColor: "red",
    marginLeft: "auto",
    borderRadius: 6,
    // fontSize: 24,
    paddingHorizontal: "5%",
  },
  clearButtonDisabled: {
    backgroundColor: "grey",
    marginLeft: "auto",
    borderRadius: 6,
    // fontSize: 24,
    paddingHorizontal: "5%",
  },
  clearConfirmButton: {
    marginTop: "auto",
    marginBottom: "5%",
    backgroundColor: "red",
    borderRadius: 6,
  },
  modalOuterView: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    // blur: 10,
  },
  modalView: {
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    // borderWidth: 2,
    // borderColor: "black",
    height: "33%",
    marginTop: "auto",
    backgroundColor: "white",
    borderRadius: 20,
  },
  modalText: {
    fontSize: 20,
    marginVertical: "3%",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "black",
    width: "20%",
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    borderRadius: 6,
    marginLeft: "auto",
  },
});
