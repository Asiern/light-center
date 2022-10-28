import { View, StyleSheet } from "react-native";

import { defaultTheme } from "../theme";
const { colors, borderRadius } = defaultTheme;

export function NetworkCard(): JSX.Element {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
    marginHorizontal: 20,
  },
});
