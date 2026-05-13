import { View, Text, Animated, PanResponder } from "react-native";
import { useRef, useEffect } from "react";

interface SwipeLabelProps {
  label: string;
  unit: string;
  onSwipe: (direction: "up" | "down") => void;
  onSwipeProgress?: (progress: number) => void;
  onSwipeComplete?: (direction: "up" | "down") => void;
}

export default function SwipeLabel({ label, unit, onSwipe, onSwipeProgress, onSwipeComplete }: SwipeLabelProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const floatY = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef<Animated.CompositeAnimation | null>(null);

  const onSwipeRef = useRef(onSwipe);
  useEffect(() => { onSwipeRef.current = onSwipe; }, [onSwipe]);

  const onProgressRef = useRef(onSwipeProgress);
  useEffect(() => { onProgressRef.current = onSwipeProgress; }, [onSwipeProgress]);

  const onCompleteRef = useRef(onSwipeComplete);
  useEffect(() => { onCompleteRef.current = onSwipeComplete; }, [onSwipeComplete]);

  // start floating loop
  useEffect(() => {
    floatAnim.current = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -6, duration: 1400, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 6,  duration: 1400, useNativeDriver: true }),
      ])
    );
    floatAnim.current.start();
    return () => floatAnim.current?.stop();
  }, []);

  const stopFloat = () => {
    floatAnim.current?.stop();
    floatY.setValue(0);
  };

  const startFloat = () => {
    floatAnim.current?.stop();
    floatAnim.current = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -6, duration: 1400, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 6,  duration: 1400, useNativeDriver: true }),
      ])
    );
    floatAnim.current.start();
  };

  const reset = () => {
    translateY.setValue(0);
    opacity.setValue(1);
    scale.setValue(1);
    startFloat();
  };

  const snapToCard = (direction: "up" | "down") => {
    stopFloat();
    const targetY = direction === "up" ? -150 : 150;

    Animated.parallel([
      Animated.spring(translateY, { toValue: targetY, useNativeDriver: true, tension: 200, friction: 20 }),
      Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 0.7, useNativeDriver: true, tension: 200, friction: 20 }),
    ]).start(() => {
      onCompleteRef.current?.(direction); // 👈 trigger hit animation on card
      reset();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 15,
      onPanResponderGrant: () => {
        stopFloat();
        Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
      },
      onPanResponderMove: (_, gesture) => {
        translateY.setValue(gesture.dy);
        const progress = Math.max(-1, Math.min(1, gesture.dy / 120));
        onProgressRef.current?.(progress);
      },
      onPanResponderRelease: (_, gesture) => {
        onProgressRef.current?.(0);
        const threshold = 120;
        if (gesture.dy > threshold) {
          onSwipeRef.current("down");
          snapToCard("down");
        } else if (gesture.dy < -threshold) {
          onSwipeRef.current("up");
          snapToCard("up");
        } else {
          startFloat();
          Animated.parallel([
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
          ]).start();
        }
      },
    })
  ).current;

  const rotate = translateY.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-8deg", "0deg", "8deg"],
  });

  const upArrowOpacity = translateY.interpolate({
    inputRange: [-120, 0, 1],
    outputRange: [1, 0.25, 0.25],
    extrapolate: "clamp",
  });
  const downArrowOpacity = translateY.interpolate({
    inputRange: [-1, 0, 120],
    outputRange: [0.25, 0.25, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{ translateY: Animated.add(translateY, floatY) }, { rotate }, { scale }],
        opacity,
      }}
    >
      {/* comic depth shadow */}
      <View style={{ position: "absolute", top: 4, left: 4, right: -4, bottom: -4, borderRadius: 20, backgroundColor: "black" }} />

      {/* main card */}
      <View style={{ width: 260, borderRadius: 20, borderWidth: 2.5, borderColor: "black", backgroundColor: "#efff00", overflow: "hidden" }}>
        
        {/* top swipe hint */}
        <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 4 }}>
          <Animated.Text style={{ fontFamily: "Bungee-Regular", fontSize: 11, color: "black", letterSpacing: 2, opacity: upArrowOpacity }}>
            ▲  SWIPE UP
          </Animated.Text>
        </View>

        <View style={{ height: 1.5, backgroundColor: "black" }} />

        {/* label content */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 12, alignItems: "center" }}>
          <Text style={{ fontFamily: "Bungee-Regular", fontSize: 22, color: "black", textAlign: "center", lineHeight: 26 }}>
            {label}
          </Text>
          <View style={{ marginTop: 8, backgroundColor: "#01f0ff", borderRadius: 999, borderWidth: 2, borderColor: "black", paddingHorizontal: 14, paddingVertical: 3 }}>
            <Text style={{ fontFamily: "Bungee-Regular", fontSize: 12, color: "black", letterSpacing: 1 }}>
              {unit}
            </Text>
          </View>
        </View>

        <View style={{ height: 1.5, backgroundColor: "black" }} />

        {/* bottom swipe hint */}
        <View style={{ alignItems: "center", paddingBottom: 10, paddingTop: 4 }}>
          <Animated.Text style={{ fontFamily: "Bungee-Regular", fontSize: 11, color: "black", letterSpacing: 2, opacity: downArrowOpacity }}>
            ▼  SWIPE DOWN
          </Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
}