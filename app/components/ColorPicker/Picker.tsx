import { StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  modulo,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { canvas2Polar, hsv2rgb, polar2Canvas } from "react-native-redash";
import { defaultTheme } from "../../theme";
import { SURFACE } from "./constants";

const SIZE = 35;
const STROKE = 5;
const R = (SIZE - STROKE) / 2;

const { colors } = defaultTheme;

const CENTER = { x: SURFACE / 2 - R - STROKE, y: -(SURFACE / 2) - R - STROKE };

interface IPicker {
  h: number;
  s: number;
  v: number;
  onChange: (r: number, g: number, b: number) => void;
}

export function Picker({ onChange }: IPicker): JSX.Element {
  const translateX = useSharedValue<number>(CENTER.x);
  const translateY = useSharedValue<number>(CENTER.y);

  const clampedPosition = useDerivedValue(() => {
    const { radius, theta } = canvas2Polar(
      { x: translateX.value, y: translateY.value },
      CENTER
    );
    const { x, y } = polar2Canvas(
      { radius: Math.min(radius, SURFACE / 2), theta },
      CENTER
    );

    return { x, y };
  });

  const pickerColor = useDerivedValue(() => {
    const { radius, theta } = canvas2Polar(
      { x: translateX.value, y: translateY.value },
      CENTER
    );
    // TODO fix modulo
    const h = ((theta % (2 * Math.PI)) / 2) * Math.PI;
    console.log(theta, h);
    const s: number = radius / (SURFACE / 2);
    const rgb = hsv2rgb(h, Math.pow(s, 2), 1);
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;
    },
    onEnd: ({ x, y }, ctx) => {
      ctx.x = x;
      ctx.y = y;
      runOnJS(onChange)(255, 0, 100);
    },
  });
  const style = useAnimatedStyle(() => ({
    backgroundColor: pickerColor.value,
    transform: [
      { translateX: clampedPosition.value.x },
      { translateY: clampedPosition.value.y },
    ],
  }));
  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.dot, StyleSheet.absoluteFill, style]}>
          {/* <Svg height={SIZE} width={SIZE}>
            <Circle
              r={R}
              fill={pickerColor.value}
              cx={SIZE / 2}
              cy={SIZE / 2}
              stroke={"#f2f2f2"}
              strokeWidth={2}
            />
          </Svg> */}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
