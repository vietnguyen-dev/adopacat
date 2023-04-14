import { View, Appearance, StatusBar } from "react-native";
import type { StatusBarStyle } from "react-native";

interface iPage {
  children: React.ReactNode;
}

const Page = ({ children }: iPage) => {
  const colorScheme = Appearance.getColorScheme();

  const schema = {
    null: "default",
    light: "light-content",
    dark: "dark-content",
  };

  const bar = schema[colorScheme!] as StatusBarStyle;

  return (
    <>
      <StatusBar
        animated={false}
        // backgroundColor="#FF0000"
        barStyle={bar}
        showHideTransition={"none"}
        hidden={false}
      />
      <View>{children}</View>
    </>
  );
};

export default Page;
