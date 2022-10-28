import { View, StyleSheet, Text } from "react-native";

import { defaultTheme } from "../../theme";
import { INetwork } from "../../types";
const { colors, borderRadius } = defaultTheme;

export function Network({ bssid }: INetwork): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>{bssid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
