import { Feather } from "@expo/vector-icons";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useState } from "react";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { defaultTheme } from "../../theme";
import { getNetworkStateAsync } from "expo-network";

import { useEffect } from "react";
import { INetwork } from "../../types";
import { Network } from "./Network";
import { networkScan } from "../../utils";

const { colors } = defaultTheme;

const waveCount: number = 3;
const circleSize: number = 100;
const maxCircleSize: number = 300;
const transitionDuration = 4000;

interface IDot {
  index: number;
}

// BUG animation delay increases between cycles
function Dot({ index }: IDot): JSX.Element {
  const progress = useSharedValue<number>(0);
  const delay = 500 * index;
  useEffect(() => {
    progress.value = withRepeat(
      withDelay(
        delay,
        withTiming(1, { duration: transitionDuration, easing: Easing.linear })
      ),
      -1 // Repeat infinetly
    );
  }, []);

  const scale = maxCircleSize / circleSize;
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: progress.value * scale,
        },
      ],
      backgroundColor: colors.primary,
      opacity: interpolate(progress.value, [0, 1], [1, 0]),
    };
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, styles.dot, style]} />
  );
}

function Scanning(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.dot}>
        {[...Array(waveCount).keys()].map((index: number) => {
          return <Dot key={index} index={index} />;
        })}
        <Feather name="wifi" size={40} color={colors.white} />
      </View>
    </View>
  );
}

export function DeviceScan(): JSX.Element {
  const [scanning, setScanning] = useState<boolean>(true);
  const data: INetwork[] = [{ bssid: "Router1" }, { bssid: "Router2" }];
  const [networkOn, setNetworkOn] = useState<boolean>();
  useEffect(() => {
    const getNetworkStatus = async () => {
      setNetworkOn(await (await getNetworkStateAsync()).isConnected);
    };
    getNetworkStatus();
    // TODO scan for network devices
    const runNetworkScan = async () => {
      const networkSnap: INetwork[] = await networkScan();
    };
    runNetworkScan();
  }, []);

  // TODO network off screen
  if (!networkOn)
    return (
      <View>
        <Text>Network is off</Text>
      </View>
    );

  if (scanning) return <Scanning />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <Network bssid={item.bssid} />;
        }}
        ItemSeparatorComponent={({ item }) => {
          return (
            <View
              style={{
                height: 2,
                backgroundColor: colors.primary,
                opacity: 0.2,
              }}
            />
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  dot: {
    backgroundColor: colors.primary,
    borderRadius: circleSize / 2,
    aspectRatio: 1,
    width: circleSize,
    height: circleSize,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
