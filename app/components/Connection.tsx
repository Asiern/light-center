import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { IConnection } from "../types";
import { useNavigation } from "@react-navigation/native";

import { defaultTheme } from "../theme";
import { SwipeableConnection } from "./SwipeableConnection";
const { borderRadius, colors } = defaultTheme;
import { constants } from "../utils";
const { connectionHeight, iconsSize } = constants;
import { Feather } from "@expo/vector-icons";

export function Connection({
  color,
  description,
  ip,
  name,
}: IConnection): JSX.Element {
  const navigation = useNavigation();
  return (
    <SwipeableConnection>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Device", {
              props: { color, description, ip, name },
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
          <View style={styles.ip}>
            <View style={styles.ipRow}>
              {/* TODO set fill property to svg circle */}
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: colors.success,
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
    justifyContent: "flex-end",
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
