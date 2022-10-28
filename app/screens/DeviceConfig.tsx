import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Button } from "../components";

import { defaultTheme } from "../theme";
const { colors } = defaultTheme;

function FloatingButtons(): JSX.Element {
  return (
    <View style={styles.floatingButtons}>
      <Button
        label="Manual Setup"
        onPress={() => null}
        style={{ flex: 1, marginRight: 2 }}
        icon="tool"
      />
      <Button
        label="Continue"
        onPress={() => null}
        style={{ flex: 1, marginLeft: 2 }}
        icon="arrow-right"
        iconPosition="right"
      />
    </View>
  );
}

export function DeviceConfig(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.slides}></View>
      <FloatingButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.offwhite,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  slides: { flex: 1 },
  floatingButtons: {
    flexDirection: "row",
  },
});
