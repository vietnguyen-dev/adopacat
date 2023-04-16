import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRef } from "react";

import { traitList, iTraits } from "./inputs/traits-list";
import TraitSelect from "./inputs/trait-select";

interface iFilter {
  trait: iTraits;
  searchFilter: string;
  changeFilter: Function;
  scrollTo: Function;
}

const Filter = ({ trait, searchFilter, changeFilter, scrollTo }: iFilter) => {
  const selected = trait.property === searchFilter;

  const change = () => {
    if (selected) {
      changeFilter("");
    } else {
      changeFilter(trait.property);
      scrollTo();
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
  const searhFilterRef = useRef<ScrollView>(null);

  const allTraits = traitList.sort((a, b) => {
    if (a.property === searchFilter) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={searhFilterRef}
      >
        {allTraits.map((trait) => (
          <Filter
            key={trait.id}
            trait={trait}
            changeFilter={changeFilter}
            searchFilter={searchFilter}
            scrollTo={() =>
              searhFilterRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: true,
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchFilter;
