import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
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
import { clamp, hsv2rgb } from "react-native-redash";
import { SharedValue } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";

const { width } = Dimensions.get("screen");
const { colors } = defaultTheme;

interface ISlider {
  onChange: (r: number, g: number, b: number) => void;
  onChanging: (r: number, g: number, b: number) => void;
  h: SharedValue<number>;
  s: SharedValue<number>;
  v: SharedValue<number>;
}

export function Slider({
  h,
  s,
  v,
  onChange,
  onChanging,
}: ISlider): JSX.Element {
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
      v.value = interpolate(
        translateX.value,
        [startX, endX - DOT_SIZE],
        [1, 0]
      );
      const rgb = hsv2rgb(h.value, s.value, v.value);
      runOnJS(onChanging)(rgb.r, rgb.g, rgb.b);
    },
    onEnd: ({ x }, ctx) => {
      ctx.x = x;
      const rgb = hsv2rgb(h.value, s.value, v.value);
      runOnJS(onChange)(rgb.r, rgb.g, rgb.b);
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
