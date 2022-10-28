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
import { Button, Connection, ConnectionFilters } from "../components";
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
      <View>
        <View
          style={{
            marginTop: StatusBar.currentHeight,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            display: "flex",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Feather stroke={colors.primary} name="arrow-left" size={25} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* TODO align title */}
            <Text style={styles.title}>Devices</Text>
          </View>
          <Button
            icon={"plus"}
            onPress={() => navigation.navigate("DeviceConfig")}
            style={{ padding: 10 }}
          />
        </View>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.offwhite, flex: 1 },
  title: {
    fontFamily: "Poppins_500Medium",
    color: colors.black,
    fontSize: 18,
  },
});
