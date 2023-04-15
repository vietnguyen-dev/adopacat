import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

import { traitList, iTraits } from "./inputs/traits-list";

interface iFilter {
  trait: iTraits;
  searchFilter: string;
  changeFilter: Function;
}

const Filter = ({ trait, searchFilter, changeFilter }: iFilter) => {
  const selected = trait.trait === searchFilter;

  const change = () => {
    if (selected) {
      changeFilter("");
    } else {
      changeFilter(trait.trait);
    }
  };

  return (
    <TouchableOpacity
      onPress={change}
      className={`px-3 pl-3 mt-3 ml-4 border-2 border-white rounded-full ${
        selected && "bg-blue-400 border-blue-400"
      }`}
    >
      <Text className={`p-1 ${selected ? "text-[#212121]" : "text-white"}`}>
        {trait.trait}
      </Text>
    </TouchableOpacity>
  );
};

interface iSearchFilter {
  searchFilter: string;
  changeFilter: Function;
}

const SearchFilter = ({ changeFilter, searchFilter }: iSearchFilter) => {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {traitList.map((trait) => (
          <Filter
            key={trait.id}
            trait={trait}
            changeFilter={changeFilter}
            searchFilter={searchFilter}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchFilter;
