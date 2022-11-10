import { useContext, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  View,
} from "react-native";
import { Connection, FloatingActions, NetworkCard } from "../components";
import { defaultTheme } from "../theme";
import { deviceContext } from "../context";
import { useNavigation } from "@react-navigation/native";
import { IConnection, RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeConnection } from "../utils";

const { colors } = defaultTheme;

export function Home(): JSX.Element {
  const { context } = useContext(deviceContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {}, [context]);

  return (
    <SafeAreaView style={styles.conatiner}>
      <View>
        <Text style={styles.text}>Devices</Text>

        {context?.length === 0 ? (
          <View>
            <Text>Add devices</Text>
          </View>
        ) : (
          context
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
            )
        )}
      </View>
      {/* <Text style={styles.text}>Network</Text> */}
      {/* TODO network summary */}
      {/* <NetworkCard /> */}
      <FloatingActions
        onCreate={() =>
          storeConnection({
            color: { b: 255, g: 255, r: 255 },
            description: "PC led",
            ip: "192.168.1.137",
            name: "PC",
            tags: ["LED"],
          })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: defaultTheme.colors.offwhite,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Poppins_500Medium",
    marginLeft: 20,
    fontSize: 24,
    color: colors.primary,
    marginTop: 10,
  },
});
