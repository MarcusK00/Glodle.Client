import { Pressable, Text, View, PressableProps, Animated } from "react-native";
import { useRef } from "react";

interface ButtonProps extends PressableProps {
  label: string;
  onPress: () => void;
}

export default function Button({ label, onPress, ...props }: ButtonProps) {
  const scale       = useRef(new Animated.Value(1)).current;
  const translateY  = useRef(new Animated.Value(0)).current;
  const shakeX      = useRef(new Animated.Value(0)).current;
  const cyanOpacity = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale,       { toValue: 0.93, useNativeDriver: true, tension: 1200, friction: 20 }),
      Animated.spring(translateY,  { toValue: 5,    useNativeDriver: true, tension: 1200, friction: 20 }),
      Animated.timing(cyanOpacity, { toValue: 1,    duration: 20, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale,       { toValue: 1, useNativeDriver: true, tension: 1200, friction: 20 }),
      Animated.spring(translateY,  { toValue: 0, useNativeDriver: true, tension: 1200, friction: 20 }),
      Animated.timing(cyanOpacity, { toValue: 0, duration: 60, useNativeDriver: true }),
      Animated.sequence([
        Animated.timing(shakeX, { toValue: -4, duration: 20, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue:  4, duration: 20, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue:  0, duration: 15, useNativeDriver: true }),
      ]),
    ]).start();
    onPress();
  };

  return (
    <Pressable {...props} onPressIn={handlePressIn} onPressOut={handlePressOut} className="w-65">
      <Animated.View style={{ transform: [{ scale }, { translateY }, { translateX: shakeX }] }}>
        <View className="absolute -bottom-1.5 -right-1 left-1 top-1.5 rounded-2xl bg-black" />
        <View className="h-16 items-center justify-center overflow-hidden rounded-xl border-[2.5px] border-black bg-[#efff00]">
          <Animated.Text
            className="absolute [font-family:Bungee-Regular] text-2xl tracking-wide text-[#01f0ff]"
            style={{ opacity: cyanOpacity, transform: [{ translateX: 3 }] }}
          >
            {label}
          </Animated.Text>
          <Text className="[font-family:Bungee-Regular] text-2xl tracking-wide text-black">
            {label}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}