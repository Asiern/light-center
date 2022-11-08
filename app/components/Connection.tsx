import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { IConnection, RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

import { defaultTheme } from "../theme";
import { SwipeableConnection } from "./SwipeableConnection";
const { borderRadius, colors } = defaultTheme;
import { constants, PORT } from "../utils";
const { connectionHeight, iconsSize } = constants;
import { StackNavigationProp } from "@react-navigation/stack";

export function Connection({
  color,
  description,
  ip,
  name,
  tags,
}: IConnection): JSX.Element {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [on, setOn] = useState<boolean>(false);

  useEffect(() => {
    let ws = new WebSocket(`ws://${ip}:${PORT}`);
    try {
      ws.onopen = () => {
        ws.send("P"); // Send ping message
      };
      ws.onmessage = () => {
        setOn(true);
        ws.close();
      };
    } catch (error) {
      console.error(error);
    }
    return () => ws.close();
  }, []);
  return (
    <SwipeableConnection>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Device", {
              props: { color, description, ip, name, tags },
            })
          }
          style={{
            backgroundColor: colors.white,
            flex: 1,
            borderRadius,
            padding: 10,
          }}
        >
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <View
            style={[
              styles.ip,
              tags.length === 0 || tags === undefined
                ? { justifyContent: "flex-end" }
                : { justifyContent: "space-between" },
            ]}
          >
            {/* {tags.map((tag: string) => {
              return (
                <View style={styles.ipRow}>
                  <Text>LED</Text>
                </View>
              );
            })} */}
            <View style={styles.ipRow}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: on ? colors.success : colors.error,
                  borderRadius: iconsSize / 2,
                }}
              />
              <Text style={styles.ipText}>{ip}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SwipeableConnection>
  );
}

const styles = StyleSheet.create({
  container: {
    height: connectionHeight,
    borderRadius,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: colors.white,
  },
  name: {
    fontFamily: "Poppins_500Medium",
  },
  description: {
    fontFamily: "Poppins_400Regular",
  },
  ip: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  ipRow: {
    backgroundColor: colors.offwhite,
    borderRadius,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ipText: {
    fontFamily: "Poppins_500Medium",
    marginLeft: 5,
  },
});
