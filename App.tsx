import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Device,
  DeviceConfig,
  DeviceEditor,
  Devices,
  Home,
} from "./app/screens";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import "react-native-gesture-handler";
import { deviceContext } from "./app/context";
import { getNetworkStateAsync, NetworkState } from "expo-network";
import { IConnection } from "./app/types";
import { readConnections } from "./app/utils";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import { defaultTheme } from "./app/theme";
const { colors } = defaultTheme;
setStatusBarBackgroundColor(colors.offwhite, false);

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });
  const [network, setNetwork] = useState<NetworkState | undefined>(undefined);
  const [connections, setConnections] = useState<IConnection[]>();

  useEffect(() => {
    const fetchConnections = async () => {
      const connections = await readConnections();
      setConnections(connections);
    };
    const checkNetwork = async () => {
      const state = await getNetworkStateAsync();
      setNetwork(state);
    };
    checkNetwork();
    fetchConnections();
  }, []);

  if (!fontsLoaded) return null;

  if (connections === undefined) return null;

  // TODO show warning if network is off
  if (network === undefined) return <View></View>;

  return (
    <deviceContext.Provider
      value={{ context: connections, setContext: setConnections }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Device" component={Device} />
          <Stack.Screen name="Devices" component={Devices} />
          <Stack.Screen name="DeviceEditor" component={DeviceEditor} />
          <Stack.Screen name="DeviceConfig" component={DeviceConfig} />
        </Stack.Navigator>
      </NavigationContainer>
    </deviceContext.Provider>
  );
}
