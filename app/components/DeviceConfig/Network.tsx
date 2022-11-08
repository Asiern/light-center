import { View, StyleSheet, Text } from "react-native";

import { defaultTheme } from "../../theme";
const { colors, borderRadius } = defaultTheme;

export function Network(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
