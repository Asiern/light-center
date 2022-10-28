import { Button } from "../components/Button";
import { View } from "react-native";
import { constants } from "../utils";
import { useNavigation } from "@react-navigation/native";

interface IFloatingActions {
  onToggle: () => void;
  onCreate: () => void;
}

const { iconsSize } = constants;

export function FloatingActions({
  onCreate,
  onToggle,
}: IFloatingActions): JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", padding: 20 }}>
      <Button icon={"power"} onPress={() => null} style={{ marginRight: 10 }} />
      <Button
        label="Show all Devices"
        onPress={() => navigation.navigate("Devices")}
        icon={"airplay"}
        style={{ marginRight: 10, flex: 1 }}
      />
      <Button onPress={() => onCreate()} icon={"plus"} />
    </View>
  );
}
