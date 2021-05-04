import React from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface InfiniteScrollProps {
  children: React.ReactNode | React.ReactNodeArray;
  width: number;
  height: number;
}

interface WrapperProps {
  children?: React.ReactNode;
  scrollX: Animated.SharedValue<number>;
  scrollY: Animated.SharedValue<number>;
  dirX: Animated.SharedValue<number>;
  dirY: Animated.SharedValue<number>;
  pos: [number, number];
  index: number;
  width: number;
  height: number;
}

const Wrapper = (props: WrapperProps) => {
  const { index, children, scrollX, scrollY, width, height } = props;
  /*   const w = useSharedValue<number>(1);
  const h = useSharedValue<number>(1); */
  const wrapperStyle = useAnimatedStyle(() => {
    const isEven = (i: number) => i % 2;
    const isBiggerX = scrollX.value % width >= 0 ? -1 : 1;
    const posX = !isEven(index) ? isBiggerX : 0;
    const isBiggerY = scrollY.value % height >= 0 ? -1 : 1;
    const posY = index > 1 ? isBiggerY : 0;
    return {
      position: "absolute",
      width,
      height,
      left: width * posX,
      top: height * posY,
      transform: [
        {
          translateX: scrollX.value % width,
        },
        {
          translateY: scrollY.value % height,
        },
      ],
      overflow: "hidden",
    };
  });

  return (
    <Animated.View style={wrapperStyle}>
      <View
        style={{
          height,
          width,
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

export default (props: InfiniteScrollProps) => {
  const scrollX = useSharedValue<number>(0);
  const scrollY = useSharedValue<number>(0);
  const dirX = useSharedValue<number>(1);
  const dirY = useSharedValue<number>(1);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetX: number; offsetY: number }
  >({
    onStart(e, ctx) {
      ctx.offsetX = scrollX.value;
      ctx.offsetY = scrollY.value;
    },
    onActive(e, ctx) {
      scrollX.value = e.translationX + ctx.offsetX;
      scrollY.value = e.translationY + ctx.offsetY;
      dirX.value = e.velocityX >= 0 ? -1 : 1;
      dirY.value = e.velocityY >= 0 ? -1 : 1;
    },
    onEnd(e, ctx) {
      scrollX.value = withDecay({
        velocity: e.velocityX,
      });
      scrollY.value = withDecay({
        velocity: e.velocityY,
      });
    },
    onCancel(e, ctx) {
      cancelAnimation(scrollX);
      cancelAnimation(scrollY);
    },
  });
  const wrapperStyle = useAnimatedStyle(() => ({
    width: props.width,
    height: props.height,
    overflow: "hidden",
  }));

  return (
    <PanGestureHandler {...{ onGestureEvent }} key="a">
      <Animated.View style={wrapperStyle}>
        {["0", "1", "2", "3"].map((k, i) => (
          <Wrapper
            key={k}
            index={i}
            pos={[0, 0]}
            scrollX={scrollX}
            dirX={dirX}
            dirY={dirY}
            scrollY={scrollY}
            width={props.width}
            height={props.height}
          >
            {props.children}
          </Wrapper>
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};
