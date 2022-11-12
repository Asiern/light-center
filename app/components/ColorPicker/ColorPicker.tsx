import { View, StatusBar } from "react-native";
import { IRGB } from "../../types";
import { Hue } from "./Hue";
import { Slider } from "./Slider";

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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Hue onChange={onChange} onChanging={onChanging} />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Slider />
      </View>
    </View>
  );
}
