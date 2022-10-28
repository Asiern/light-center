import { Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { defaultTheme } from "../theme";

interface ITag {
  title: string;
  onPress: (filters: string[]) => void;
  filters: string[];
}

const { colors } = defaultTheme;

export function Tag({ onPress, title, filters }: ITag) {
  const [selected, setSelected] = useState<boolean>(false);

  const handlePress = () => {
    if (selected) {
      const index = filters.indexOf(title);
      onPress([
        ...filters.slice(0, index),
        ...filters.slice(index + 1, filters.length),
      ]);
    } else {
      onPress([...filters, title]);
    }
    setSelected(!selected);
  };
  return (
    <TouchableOpacity
      style={{
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        borderRadius: 20,
        borderColor: selected ? colors.primary : colors.white,
        borderWidth: 1,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.0,
        elevation: 1,
      }}
      onPress={handlePress}
    >
      <Text style={{ fontFamily: "Poppins_400Regular" }}>{title}</Text>
    </TouchableOpacity>
  );
}
