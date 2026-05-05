import "../global.css";
import { useFonts } from 'expo-font';
import { Slot } from "expo-router";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Appearance, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
const GAP = 40;

const DOTS = Array.from({ length: Math.ceil(width / GAP) * Math.ceil(height / GAP) }, (_, i) => {
  const cols = Math.ceil(width / GAP);
  return {
    id: i,
    x: (i % cols) * GAP + 4,
    y: Math.floor(i / cols) * GAP + 4,
    float: 4 + Math.random() * 8,
  };
});

export default function Layout() {
  const [fontsLoaded] = useFonts({ "Bungee-Regular": require("../assets/fonts/Bungee-Regular.ttf") });
  const tick = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Appearance.setColorScheme("light");
    Animated.loop(
      Animated.sequence([
        Animated.timing(tick, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(tick, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={StyleSheet.absoluteFill} className="bg-[#01f0ff]">
      {DOTS.map((dot) => (
        <Animated.View
          key={dot.id}
          className="absolute w-1 h-1 rounded-full bg-black opacity-80"
          style={{
            left: dot.x,
            top: dot.y,
            transform: [{
              translateY: tick.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -dot.float],
              }),
            }],
          }}
        />
      ))}
      <Slot />
    </View>
  );
}