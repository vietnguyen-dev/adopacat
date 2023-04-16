import { View, Text, Image, SafeAreaView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import * as Progress from "react-native-progress";

import iCatData from "interfaces/iCataData";

interface iMyCatOrder {
  catData: iCatData;
}

interface iProgressText {
  value: number;
}

interface iProgressMap {
  [key: number]: string;
}

const progressMap: iProgressMap = {
  0: "Order Placed",
  0.1: "Order Placed",
  0.2: "Order Placed",
  0.3: "Order Recieved",
  0.4: "Order Recieved",
  0.5: "Order Recieved",
  0.6: "In Progress",
  0.7: "In Progress",
  0.8: "In Progress",
  0.9: "In Progress",
  1: "Delivered",
};

const ProgressText = ({ value }: iProgressText) => {
  const used = progressMap[value];
  return <Text className="text-white pt-3">{used}</Text>;
};

const MyCatOrder = ({ catData }: iMyCatOrder) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress <= 0.9) {
        setProgress((progress) => Math.round((progress + 0.1) * 100) / 100);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <View className="flex flex-row border-[.5px] border-gray-400/80 rounded-md mb-3">
      <Image
        source={{ uri: catData.image.url }}
        className="w-32 h-32 rounded-l-sm"
      />
      <View className="pl-3 pt-3">
        <Text className="text-white text-2xl">{catData.name}</Text>
        <ProgressText value={progress} />
        <View className="pt-3">
          <Progress.Bar
            progress={progress}
            width={230}
            color={"rgba(96,165,250,1)"}
          />
        </View>
      </View>
    </View>
  );
};

interface iMyCatOrders {
  catDataArr: iCatData[] | [];
}

const MyCatOrders = ({ catDataArr }: iMyCatOrders) => {
  return (
    <SafeAreaView className="my-6">
      {catDataArr.length > 0 ? (
        <FlatList
          data={catDataArr}
          renderItem={({ item }) => <MyCatOrder catData={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text className="text-white">No Cats Ordered</Text>
      )}
    </SafeAreaView>
  );
};

export default MyCatOrders;
