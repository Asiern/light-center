import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { View, Dimensions, StyleSheet } from "react-native";
import { DOT_SIZE, SURFACE } from "./constants";
import { defaultTheme } from "../../theme";
import {
  Canvas,
  RoundedRect,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import { clamp } from "react-native-redash";

const { width } = Dimensions.get("screen");
const { colors } = defaultTheme;

export function Slider(): JSX.Element {
  const startX = (width - SURFACE) / 2;
  const endX = (width - SURFACE) / 2 + SURFACE;
  const translateX = useSharedValue<number>(startX);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = clamp(ctx.x + translationX, startX, endX - DOT_SIZE);
    },
    onEnd: ({ x }, ctx) => {
      ctx.x = x;
    },
  });

  const selectedColor = useDerivedValue(() => {
    return interpolateColor(
      translateX.value,
      [startX, endX - DOT_SIZE],
      [colors.black, colors.white]
    );
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: selectedColor.value,
  }));

  return (
    <GestureHandlerRootView
      style={{ justifyContent: "center", flexDirection: "row" }}
    >
      {/* Slider shadow */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 1.0,
            elevation: 1,
            width: SURFACE,
            height: DOT_SIZE,
            position: "absolute",
            marginLeft: startX,
            borderRadius: DOT_SIZE / 2,
          },
        ]}
      />
      <Canvas
        style={{
          width,
          height: DOT_SIZE,
        }}
      >
        <RoundedRect
          x={(width - SURFACE) / 2}
          y={0}
          width={SURFACE}
          height={DOT_SIZE}
          r={DOT_SIZE / 2}
        >
          <LinearGradient
            start={vec(DOT_SIZE, 0)}
            end={vec(SURFACE, DOT_SIZE)}
            colors={[colors.white, colors.black]}
          />
        </RoundedRect>
      </Canvas>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              height: DOT_SIZE,
              width: DOT_SIZE,
              borderRadius: DOT_SIZE / 2,
              backgroundColor: "#FFF",
            },
            style,
          ]}
        />
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
