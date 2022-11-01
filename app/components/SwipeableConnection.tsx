import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { clamp, snapPoint } from "react-native-redash";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { defaultTheme } from "../theme";
const { colors, borderRadius } = defaultTheme;

interface ISwipeableConnection {
  children: React.ReactNode;
}

import { constants } from "../utils";
import { Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
const { connectionHeight, iconsSize, iconMargin } = constants;

const handleDeviceDeletion = async () => {};

export function SwipeableConnection({
  children,
}: ISwipeableConnection): JSX.Element {
  const translateX = useSharedValue(0);
  const snapPoints = [
    -(iconsSize + 2 * iconMargin),
    0,
    iconsSize + 2 * iconMargin,
  ];
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = clamp(
        ctx.x + translationX,
        -(iconsSize + 2 * iconMargin),
        iconsSize + 2 * iconMargin
      );
    },
    onEnd: ({ velocityX }) => {
      translateX.value = withSpring(
        snapPoint(translateX.value, velocityX, snapPoints),
        {
          overshootClamping: true,
        }
      );
    },
  });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <GestureHandlerRootView>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              flex: 1,
              padding: 20,
            }}
            onPress={() => navigation.navigate("DeviceEditor")}
          >
            <Feather
              stroke={colors.white}
              name="edit"
              size={iconsSize}
              color={colors.white}
            />
          </TouchableOpacity>

          <View
            style={{ backgroundColor: colors.error, borderRadius, flex: 1 }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                flex: 1,
                alignItems: "flex-end",
                padding: 20,
              }}
              onPress={handleDeviceDeletion}
            >
              <Feather
                stroke={colors.white}
                name="trash"
                size={iconsSize}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>{children}</Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius,
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginVertical: 5,
    height: connectionHeight,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
