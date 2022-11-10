import { View, StatusBar } from "react-native";
import { IRGB } from "../../types";
import { Hue } from "./Hue";

interface IColorPicker {
  onChange: (r: number, g: number, b: number) => void;
  onChanging: (r: number, g: number, b: number) => void;
  initialColor: IRGB;
}

export function ColorPicker({
  onChange,
  onChanging,
}: IColorPicker): JSX.Element {
  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Hue onChange={onChange} onChanging={onChanging} />
      </View>
    </View>
  );
}
