import { Text, View, Alert, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useRound } from "../api/hooks/getRound";
import CountryCard from "../components/CountryCard";
import { HandleAnswer } from "../utils/handleAnswer";
import { useState, useRef } from "react";
import SwipeLabel from "../components/SwipeComponent";

export default function App() {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(false);
  const [roundKey, setRoundKey] = useState(0);
  const { round, loading } = useRound(roundKey);
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  const topCardScale = useRef(new Animated.Value(1)).current;
  const bottomCardScale = useRef(new Animated.Value(1)).current;
  const topCardHit = useRef(new Animated.Value(1)).current;
  const bottomCardHit = useRef(new Animated.Value(1)).current;

  const handleSwipeProgress = (progress: number) => {
    const maxBoost = 0.08;
    topCardScale.setValue(1 + Math.max(0, -progress) * maxBoost);
    bottomCardScale.setValue(1 + Math.max(0, progress) * maxBoost);
  };

  const handleSwipeComplete = (direction: "up" | "down") => {
    const target = direction === "up" ? topCardHit : bottomCardHit;
    Animated.sequence([
      Animated.spring(target, { toValue: 1.08, useNativeDriver: true, tension: 800, friction: 6 }),
      Animated.spring(target, { toValue: 1,    useNativeDriver: true, tension: 800, friction: 6 }),
    ]).start();
  };

  const Submit = (guess: "A" | "B") => {
    if (!round || isLocked) return;
    setIsLocked(true);
    const isCorrect = HandleAnswer(round.countries[0], round.countries[1], guess);
    if (isCorrect) {
      setResult("correct");
      setScore(prev => prev + 1);
      setTimeout(() => {
        setResult(null);
        setRoundKey(prev => prev + 1);
        setIsLocked(false);
      }, 1000);
    } else {
      setResult("wrong");
      setTimeout(() => {
        setResult(null);
        setScore(0);
        router.back();
        Alert.alert("Wrong!", "Game Over");
      }, 1000);
    }
  };

  const submitRef = useRef<(guess: "A" | "B") => void>(() => {});
  submitRef.current = Submit;

  return (
    <View className="flex-1 items-center justify-between py-15">

      {/* TITLE */}
      <View className="items-center pr-50">
        <View className="bg-black rounded-2xl pb-1.5 pr-1.5">
          <View className="w-30 h-13 outline-3 rounded-xl items-center bg-white">
            <Text className="pt-3 text-xl [font-family:Bungee-Regular]">Glodle</Text>
          </View>
        </View>
      </View>

      {/* SCORE */}
      <View className="absolute top-15 right-4 z-50">
        <View className="bg-black rounded-2xl pb-1.5 pr-1.5">
          <View className="w-30 h-13 outline-2 outline-[#02ebf7] rounded-xl items-center justify-center bg-[#efff00]">
            <Text className="text-lg [font-family:Bungee-Regular]">Streak: {score}</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 w-full items-center justify-center">

        {/* TOP CARD */}
        <Animated.View
          className="items-center mb-10"
          style={{ transform: [{ scale: Animated.multiply(topCardScale, topCardHit) }] }}
        >
          <CountryCard
            onPress={() => submitRef.current("A")}
            countryName={round?.countries[0]?.country}
            flag_url={round?.countries[0]?.flag_url}
          />
        </Animated.View>

        {/* BOTTOM CARD */}
        <Animated.View
          className="items-center mt-20"
          style={{ transform: [{ scale: Animated.multiply(bottomCardScale, bottomCardHit) }] }}
        >
          <CountryCard
            onPress={() => submitRef.current("B")}
            countryName={round?.countries[1]?.country}
            flag_url={round?.countries[1]?.flag_url}
          />
        </Animated.View>

        {/* SWIPE LABEL */}
        <View className="absolute items-center justify-center z-50">
          <SwipeLabel
            onSwipe={(dir) => submitRef.current(dir === "up" ? "A" : "B")}
            onSwipeProgress={handleSwipeProgress}
            onSwipeComplete={handleSwipeComplete}
            unit={round?.question.unit || ""}
            label={round?.question.label || ""}
          />
        </View>

      </View>
    </View>
  );
}