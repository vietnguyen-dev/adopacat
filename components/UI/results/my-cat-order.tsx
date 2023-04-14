import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
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
  return <Text style={orderStyle.progressText}>{used}</Text>;
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
    <View style={orderStyle.orderContainer}>
      <Image
        source={{ uri: catData.image.url }}
        style={{ width: 100, height: 100 }}
      />
      <View style={orderStyle.orderText}>
        <Text style={orderStyle.title}>{catData.name}</Text>
        <ProgressText value={progress} />
        <View style={orderStyle.progress}>
          <Progress.Bar progress={progress} width={250} />
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
    <SafeAreaView style={orderStyle.allOrderContainer}>
      {catDataArr.length > 0 ? (
        <FlatList
          data={catDataArr}
          renderItem={({ item }) => <MyCatOrder catData={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No Cats Ordered</Text>
      )}
    </SafeAreaView>
  );
};

const orderStyle = StyleSheet.create({
  allOrderContainer: {
    marginTop: "5%",
  },
  orderText: {
    paddingLeft: "3%",
  },
  orderContainer: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: "5%",
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
  },
  progress: {
    marginTop: "auto",
    marginBottom: "5%",
  },
  progressText: {
    paddingTop: "5%",
  },
});

export default MyCatOrders;
