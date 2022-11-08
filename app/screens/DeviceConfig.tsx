import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Button, DeviceConfigComponents, TitleBar } from "../components";
const { DeviceScan } = DeviceConfigComponents;
import { defaultTheme } from "../theme";
import { IConnection, RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { ManualSetup } from "../components/DeviceConfig/ManualSetup";
import { storeConnection } from "../utils";
const { colors, borderRadius } = defaultTheme;

type slides = "scan" | "manual";

interface IFloatingButtons {
  slide: slides;
  setSlide: (slide: slides) => void;
  disabled: boolean[];
  onContinue: () => void;
}

function FloatingButtons({
  setSlide,
  slide,
  disabled,
  onContinue,
}: IFloatingButtons): JSX.Element {
  return (
    <View style={styles.floatingButtons}>
      <Button
        label={slide === "manual" ? "Guided Setup" : "Manual Setup"}
        onPress={() => setSlide(slide === "manual" ? "scan" : "manual")}
        style={{ flex: 1, marginRight: 2 }}
        icon="tool"
        disabled={disabled[0]}
      />
      <Button
        label="Continue"
        onPress={onContinue}
        style={{ flex: 1, marginLeft: 2 }}
        icon="arrow-right"
        iconPosition="right"
        disabled={disabled[1]}
      />
    </View>
  );
}

export function DeviceConfig(): JSX.Element {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [state, setState] = useState<slides>("scan");
  const [connection, setConnection] = useState<IConnection | undefined>(
    undefined
  );

  function getSlide(state: slides): JSX.Element {
    switch (state) {
      case "manual":
        return <ManualSetup onChange={setConnection} />;
      case "scan":
        return <DeviceScan />;
    }
  }

  async function onContinue() {
    if (connection === undefined) return;
    await storeConnection(connection);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TitleBar />
      <View style={styles.slides}>{getSlide(state)}</View>
      <FloatingButtons
        slide={state}
        setSlide={setState}
        disabled={[false, false]}
        onContinue={onContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offwhite,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  slides: {
    marginHorizontal: 20,
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
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
