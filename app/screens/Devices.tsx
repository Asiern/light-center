import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  Text,
  StatusBar,
} from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Connection, ConnectionFilters, TitleBar } from "../components";
import { defaultTheme } from "../theme";
import { deviceContext } from "../context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { constants } from "../utils";
import { IConnection, RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
const { colors } = defaultTheme;
const { iconsSize } = constants;

const filters: string[] = ["Light", "LED", "ESP32"];

export function Devices(): JSX.Element {
  const { context } = useContext(deviceContext);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <TitleBar
        title="Devices"
        right={
          <Button
            icon={"plus"}
            onPress={() => navigation.navigate("DeviceConfig")}
            style={{ padding: 10 }}
          />
        }
      />
      {/* <Button
            icon={"plus"}
            onPress={() => navigation.navigate("DeviceConfig")}
            style={{ padding: 10 }}
          /> */}
      <ConnectionFilters
        onChange={setSelectedFilters}
        filters={filters}
        selectedFilters={selectedFilters}
      />
      {context?.map(
        (
          { color, description, ip, name, tags }: IConnection,
          index: number
        ) => {
          let filterPass: boolean = false;
          if (selectedFilters.length > 0) {
            if (selectedFilters.length > 0) {
              selectedFilters.forEach((filter: string) => {
                tags?.forEach((tag: string) => {
                  if (filter === tag) filterPass = true;
                });
              });
            } else filterPass = true;
          }
          if (filterPass || selectedFilters.length === 0)
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
          else return null;
        }
      )}
      {/* <FlatList
          data={context}
          renderItem={({ item, index }) => {
            let filterPass: boolean = false;
            if (selectedFilters.length > 0) {
              if (selectedFilters.length > 0) {
                selectedFilters.forEach((filter: string) => {
                  item.tags?.forEach((tag: string) => {
                    if (filter === tag) filterPass = true;
                  });
                });
              } else filterPass = true;
            }
            if (filterPass || selectedFilters.length === 0)
              return (
                <Connection
                  name={item.name}
                  color={item.color}
                  description={item.description}
                  ip={item.ip}
                  key={index}
                  tags={item.tags}
                />
              );
            else return null;
          }}
        /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offwhite,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
