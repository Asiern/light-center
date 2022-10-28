import { View, StyleSheet } from "react-native";
import { defaultTheme } from "../theme";
const { colors } = defaultTheme;
export function Device(): JSX.Element {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.offwhite, flex: 1 },
});
