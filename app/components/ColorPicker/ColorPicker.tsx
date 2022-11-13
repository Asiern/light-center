import { View, StatusBar } from "react-native";
import { useSharedValue } from "react-native-reanimated";
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
  const h = useSharedValue<number>(1);
  const s = useSharedValue<number>(1);
  const v = useSharedValue<number>(1);
  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Hue {...{ onChange, onChanging, h, s, v }} />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Slider {...{ onChange, onChanging, h, s, v }} />
      </View>
    </View>
  );
}
