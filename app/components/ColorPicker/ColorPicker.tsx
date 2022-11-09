import { View, StatusBar } from "react-native";
import { onChange } from "react-native-reanimated";
import { TitleBar } from "../TitleBar";
import { Hue } from "./Hue";

interface IColorPicker {
  onChange: (r: number, g: number, b: number) => void;
}

export function ColorPicker({ onChange }: IColorPicker): JSX.Element {
  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <TitleBar />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Hue onChange={onChange} />
      </View>
    </View>
  );
}
