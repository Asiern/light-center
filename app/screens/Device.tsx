import { View, StyleSheet, StatusBar, Text } from "react-native";
import { ColorPicker } from "../components";
import { defaultTheme } from "../theme";
import { useEffect } from "react";
import { PORT, RGBtoHSV, setRGB } from "../utils";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { IConnection, IRGB, RootStackParamList } from "../types";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";

const { colors } = defaultTheme;

var ws: WebSocket;

type routeProp = RouteProp<{ params: { props: IConnection } }, "params">;

export function Device({ route }: { route: routeProp }): JSX.Element {
  const { ip, color, description, name, tags }: IConnection =
    route.params.props;
  console.log(color);
  const selectedColor = useSharedValue<IRGB>({ r: 255, g: 255, b: 255 });

  // TODO foreground contrast
  // const foregroundColor = useDerivedValue<string>(() => {
  //   const { h } = RGBtoHSV(
  //     selectedColor.value.r,
  //     selectedColor.value.g,
  //     selectedColor.value.b
  //   );
  //   return h > 0.5 ? colors.white : colors.black;
  // });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const onColorChange = (r: number, g: number, b: number) => {
    setRGB(ws, r, g, b);
    onChanging(r, g, b);
    // TODO Save color to AsyncStorage
  };

  const onChanging = (r: number, g: number, b: number) => {
    selectedColor.value = { r, g, b };
    setStatusBarBackgroundColor(`rgb(${r},${g},${b})`, false);
  };

  const style = useAnimatedStyle(() => ({
    backgroundColor: `rgb(${selectedColor.value.r},${selectedColor.value.g},${selectedColor.value.b})`,
  }));

  const onUnmount = () => {
    setStatusBarBackgroundColor(colors.offwhite, true);
    ws.close();
  };

  useEffect(() => {
    try {
      ws = new WebSocket(`ws://${ip}:${PORT}`);
      setStatusBarBackgroundColor(
        `rgb(${selectedColor.value.r},${selectedColor.value.g},${selectedColor.value.b})`,
        true
      );
      return () => onUnmount();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.titleBar, style]}>
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
          <Text style={styles.title}> {name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        ></View>
      </Animated.View>
      <ColorPicker
        onChange={onColorChange}
        onChanging={onChanging}
        initialColor={color}
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
  titleBar: {
    flexDirection: "row",
    backgroundColor: "red",
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  title: {
    fontFamily: "Poppins_500Medium",
  },
});
