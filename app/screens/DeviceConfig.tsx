import { Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, DeviceConfigComponents } from "../components";
const { DeviceScan } = DeviceConfigComponents;
import { defaultTheme } from "../theme";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
const { colors, borderRadius } = defaultTheme;

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingVertical: 20,
        }}
      >
        <Feather name="arrow-left" size={25} />
      </TouchableOpacity>
      <View style={styles.slides}>
        <DeviceScan />
      </View>
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
  slides: {
    flex: 1,
    marginBottom: 4,
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
  },
  floatingButtons: {
    flexDirection: "row",
  },
});
