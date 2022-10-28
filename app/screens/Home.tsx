import { useContext } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import { Connection, FloatingActions, NetworkCard } from "../components";
import { defaultTheme } from "../theme";
import { deviceContext } from "../context";
import { useNavigation } from "@react-navigation/native";
import { IConnection } from "../types";

const { colors } = defaultTheme;

export function Home(): JSX.Element {
  const { context } = useContext(deviceContext);
  const navigation = useNavigation();

  async function onCreate() {
    // TODO navigate to device creation
    // navigation.navigate("")
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <Text style={styles.text}>Devices</Text>
      {context
        ?.slice(0, 4)
        .map(
          (
            { color, description, ip, name, tags }: IConnection,
            index: number
          ) => {
            return (
              <Connection
                name={name}
                color={color}
                description={description}
                ip={ip}
                key={index}
                tags={tags}
              />
            );
          }
        )}

      <Text style={styles.text}>Network</Text>
      {/* TODO network summary */}
      <NetworkCard />
      <FloatingActions onCreate={onCreate} onToggle={() => null} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: defaultTheme.colors.offwhite,
  },
  text: {
    fontFamily: "Poppins_500Medium",
    marginLeft: 20,
    fontSize: 24,
    color: colors.primary,
    marginTop: 10,
  },
});
