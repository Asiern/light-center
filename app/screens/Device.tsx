import { View, StyleSheet, StatusBar } from "react-native";
import { Button, ColorPicker } from "../components";
import { defaultTheme } from "../theme";
import { useEffect, useState } from "react";
import { PORT, setRGB } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";
import { IConnection } from "../types";
const { colors } = defaultTheme;

var ws: WebSocket;

const msgEvt = (ev: MessageEvent<any>) => {
  console.log(ev);
};

const onChange = (r: number, b: number, g: number) => {
  console.log("Setting color");
  setRGB(ws, r, g, b);
};

export function Device(props): JSX.Element {
  const route: RouteProp = props.route;
  const { ip, color, description, name, tags }: IConnection = route.params;

  useEffect(() => {
    try {
      try {
        ws = new WebSocket(`ws://192.168.1.139:${PORT}`);
      } catch (error) {}
      return () => ws.close();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <View style={styles.container}>
      {/* <Button
        onPress={() => setRGB(ws, 255, 0, 0)}
        label="Red"
        style={{ marginBottom: 10 }}
      />
      <Button
        onPress={() => setRGB(ws, 0, 255, 0)}
        label="Green"
        style={{ marginBottom: 10 }}
      />
      <Button
        onPress={() => ws.send("CR0G0B255")}
        label="Blue"
        style={{ marginBottom: 10 }}
      />
      <Button
        onPress={() => ws.send("CR255G255B255")}
        label="White"
        style={{ marginBottom: 10 }}
      />
      <Button
        onPress={() => ws.send("CR0G0B0")}
        label="Black"
        style={{ marginBottom: 10 }}
      />
      <Button
        onPress={() => {
          console.log(ws.send("P"));
          ws.onmessage = msgEvt;
        }}
        label="Ping"
        style={{ marginBottom: 10 }}
      /> */}
      {/* <Button
        onPress={() => {
          AsyncStorage.clear();
        }}
        label="Clear AS"
        style={{ marginBottom: 10 }}
      /> */}
      <ColorPicker onChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offwhite,
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 20,
  },
});
