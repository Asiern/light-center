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
import { GLYPHS } from "../types";

interface IButton {
  label?: string;
  icon?: GLYPHS;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  iconPosition?: "left" | "right";
  disabled?: boolean;
}

export function Button({
  label,
  style,
  onPress,
  icon,
  iconPosition,
  disabled,
}: IButton): JSX.Element {
  const handlePress = () => {
    if (disabled) return;
    onPress();
    Vibration.vibrate(20);
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        disabled ? null : styles.containerEnabled,
      ]}
      onPress={handlePress}
    >
      {iconPosition === "left" ? (
        <Feather name={icon} size={iconsSize} />
      ) : null}
      {label === undefined ? null : (
        <Text
          style={[
            styles.label,
            disabled ? { color: colors.gray } : { color: colors.black },
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
        <Feather
          name={icon}
          size={iconsSize}
          color={disabled ? colors.gray : colors.black}
        />
      ) : null}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  iconPosition: "left",
  disabled: false,
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: colors.offwhite,
  },
  containerEnabled: {
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: "Poppins_500Medium",
  },
});
