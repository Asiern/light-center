import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { defaultTheme } from "../theme";
const { colors } = defaultTheme;

interface ITitleBar {
  title?: string;
  right?: JSX.Element;
}
export function TitleBar({ right, title }: ITitleBar): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
          <Feather name="arrow-left" size={25} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    color: colors.black,
    fontSize: 18,
  },
});
