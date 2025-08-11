import { IconLogin2, IconLogout } from "@tabler/icons-react-native";
import React, { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const CONTAINER_WIDTH = 350;
const BUTTON_WIDTH = 60;
const CONTAINER_PADDING = 5;
const SWIPEABLE_DIMENSIONS = BUTTON_WIDTH - 2 * CONTAINER_PADDING;
const SWIPE_RANGE =
  CONTAINER_WIDTH - 2 * CONTAINER_PADDING - SWIPEABLE_DIMENSIONS;

interface ICheckInCHeckOut {
  checkIn: () => Promise<boolean>;
  checkOut: () => Promise<boolean>;
  isCheckedIn: boolean;
}

const CheckInCheckOut: FC<ICheckInCHeckOut> = ({
  checkIn,
  checkOut,
  isCheckedIn,
}) => {
  const translateX = useSharedValue(isCheckedIn ? SWIPE_RANGE : 0);
  const isSwiped = useSharedValue(isCheckedIn);

  const context = useSharedValue({ x: 0 });

  const handleCheckIn = async () => {
    const success = await checkIn();
    if (!success) {
      translateX.value = withSpring(0); // يرجع لمكانه
      isSwiped.value = false;
    }
  };

  const handleCheckOut = async () => {
    const success = await checkOut(); // اعملها برضو بنفس الفكرة لو عايز
    if (!success) {
      translateX.value = withSpring(SWIPE_RANGE); // يرجع مكانه
      isSwiped.value = true;
    }
  };

  useEffect(() => {
    if (isCheckedIn) {
      translateX.value = withSpring(SWIPE_RANGE);
      isSwiped.value = true;
    } else {
      translateX.value = withSpring(0);
      isSwiped.value = false;
    }
  }, [isCheckedIn]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value };
    })
    .onUpdate((event) => {
      const newTranslateX = context.value.x + event.translationX;
      translateX.value = Math.max(0, Math.min(newTranslateX, SWIPE_RANGE));
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_RANGE / 2) {
        translateX.value = withSpring(SWIPE_RANGE);
        if (isSwiped.value === false) {
          isSwiped.value = true;

          runOnJS(handleCheckIn)();
        }
      } else {
        translateX.value = withSpring(0);
        if (isSwiped.value === true) {
          isSwiped.value = false;

          runOnJS(handleCheckOut)();
        }
      }
    });

  // Animated style for the container background color
  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, SWIPE_RANGE],
      ["#60a5fa", "#f87171"] // Gray to Green
    );
    return { backgroundColor };
  });

  // Animated style for the button's translation
  const animatedSwipeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Animated styles for text opacity
  const animatedActiveTextStyle = useAnimatedStyle(() => ({
    opacity: 1 - translateX.value / SWIPE_RANGE,
  }));
  const animatedInactiveTextStyle = useAnimatedStyle(() => ({
    opacity: translateX.value / SWIPE_RANGE,
  }));

  return (
    <Animated.View style={[styles.swipeContainer, animatedContainerStyle]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.swipeable, animatedSwipeStyle]}>
          {isCheckedIn ? (
            <IconLogout color="red" />
          ) : (
            <IconLogin2 color="#60a5fa" />
          )}
        </Animated.View>
      </GestureDetector>

      <Animated.Text style={[styles.swipeText, animatedActiveTextStyle]}>
        Swipe to Check In
      </Animated.Text>
      <Animated.Text
        style={[
          styles.swipeText,
          styles.textOverlay,
          animatedInactiveTextStyle,
        ]}
      >
        Swipe to Check Out
      </Animated.Text>
    </Animated.View>
  );
};

export default CheckInCheckOut;

const styles = StyleSheet.create({
  swipeContainer: {
    width: CONTAINER_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: CONTAINER_PADDING,
    position: "absolute",
    bottom: 15,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  swipeable: {
    width: SWIPEABLE_DIMENSIONS,
    height: SWIPEABLE_DIMENSIONS,
    backgroundColor: "white",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: CONTAINER_PADDING,
    zIndex: 3,
  },
  swipeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    zIndex: 2,
    textAlign: "center",
  },
  textOverlay: {
    position: "absolute",
    zIndex: 1,
  },
});
