import { useState, Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { defaultTheme } from "../theme";

interface ICheckList {
  options: string[];
  types: string[];
  setTypes: Dispatch<SetStateAction<string[]>>;
}

const { colors, borderRadius } = defaultTheme;

export function CheckList({
  options,
  setTypes,
  types,
}: ICheckList): JSX.Element {
  return (
    <View style={styles.container}>
      {options.map((option: string, index: number) => {
        const [selected, setSelected] = useState<boolean>(false);
        const handlePress = () => {
          if (selected) {
            const index = types.indexOf(option);
            setTypes([
              ...types.slice(0, index),
              ...types.slice(index, types.length),
            ]);
          } else setTypes([...types, option]);
          setSelected(!selected);
        };
        return (
          <TouchableOpacity
            key={index}
            style={selected ? styles.selectedOption : styles.option}
            onPress={handlePress}
          >
            <Text style={styles.text}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius,
    backgroundColor: colors.offwhite,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  option: {
    padding: 10,
    borderRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  text: {
    fontFamily: "Poppins_400Regular",
  },
});
