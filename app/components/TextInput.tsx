import {
  TextInput as Input,
  StyleSheet,
  View,
  TextInputIOSProps,
} from "react-native";

type onChangeText = (text: string) => void;

import { defaultTheme } from "../theme";
const { colors, borderRadius } = defaultTheme;

interface ITextInput {
  placeholder?: string;
  value: string;
  onChangeText: onChangeText;
  //   icon?: GLYPHS;
  secure?: boolean;
  textContentType?: TextInputIOSProps;
  error?: boolean;
}

export function TextInput({
  onChangeText,
  value,
  error,
  icon,
  placeholder,
  secure,
  textContentType,
}: ITextInput): JSX.Element {
  return (
    <View style={[styles.container, error ? styles.errorBorder : null]}>
      {/* <Feather
      name={icon}
      size={18}
      color={error ? palette.errorDefault : palette.primaryDark}
  /> */}
      <Input
        style={styles.input}
        autoCapitalize="none"
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholderTextColor={colors.success}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 65,
    width: 300,
    backgroundColor: colors.offwhite,
    justifyContent: "center",
    alignItems: "center",
    borderRadius,
    margin: 20,
    paddingHorizontal: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
  },
  errorBorder: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
});
