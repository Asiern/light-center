import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Vibration,
} from "react-native";

import { defaultTheme } from "../theme";
const { borderRadius, colors } = defaultTheme;
import { constants } from "../utils";
const { iconsSize } = constants;
import { Feather } from "@expo/vector-icons";

type GLYPHS = string;

interface IButton {
  label?: string;
  icon?: GLYPHS;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  iconPosition?: "left" | "right";
}

export function Button({
  label,
  style,
  onPress,
  icon,
  iconPosition,
}: IButton): JSX.Element {
  const handlePress = () => {
    onPress();
    Vibration.vibrate(20);
  };
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      {iconPosition === "left" ? (
        <Feather name={icon} size={iconsSize} />
      ) : null}
      {label === undefined ? null : (
        <Text
          style={[
            styles.label,
            icon !== undefined && iconPosition === "left"
              ? { marginLeft: 10 }
              : undefined,
            icon !== undefined && iconPosition === "right"
              ? { marginRight: 10 }
              : undefined,
          ]}
        >
          {label}
        </Text>
      )}
      {iconPosition === "right" ? (
        <Feather name={icon} size={iconsSize} />
      ) : null}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  iconPosition: "left",
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.white,
    borderRadius,
    flexDirection: "row",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: colors.black,
    fontFamily: "Poppins_500Medium",
  },
});
