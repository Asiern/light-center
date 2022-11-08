import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { defaultTheme } from "../../theme";
import { IConnection } from "../../types";
import { CheckList } from "../CheckList";
import { TextInput } from "../TextInput";
import { device } from "../../types";

interface IManualSetup {
  onChange: (connection: IConnection) => void;
}

const { colors } = defaultTheme;

export function ManualSetup({ onChange }: IManualSetup): JSX.Element {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ip, setIp] = useState<string>("");
  const [types, setTypes] = useState<string[]>([]);

  function handleChange() {
    onChange({ ip, name, color: "#fff", description, tags: types });
  }
  return (
    <KeyboardAvoidingScrollView style={styles.container}>
      <Text style={styles.title}>Manual Setup</Text>
      <TextInput
        icon="edit"
        placeholder="Device Name"
        onChangeText={(value) => {
          setName(value);
          handleChange();
        }}
        value={name}
      />
      <TextInput
        icon="edit"
        placeholder="Device Name"
        onChangeText={(value) => {
          setDescription(value);
          handleChange();
        }}
        value={description}
      />
      <TextInput
        icon="info"
        placeholder="Device Id"
        onChangeText={(value) => {
          setId(value);
          handleChange();
        }}
        value={id}
      />
      <TextInput
        icon="airplay"
        placeholder="ipv4 address"
        onChangeText={(value) => {
          setIp(value);
          handleChange();
        }}
        value={ip}
      />
      <CheckList
        options={["Device", "Led", "Other", "Monitor"]}
        setTypes={() => {
          setTypes();
          handleChange();
        }}
        types={types}
      />
    </KeyboardAvoidingScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  title: {
    fontFamily: "Poppins_500Medium",
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 18,
    color: colors.primary,
  },
});
