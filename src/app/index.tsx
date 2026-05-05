import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import Button from "../components/Button";
import { useRouter } from "expo-router";

const WORD = "Glodle";
const STAGGER = 200; 

export default function App() {
  const router = useRouter();
  const anims = useRef(WORD.split("").map(() => new Animated.Value(0))).current;

  useEffect(() => {
   const wave = Animated.loop(
  Animated.stagger(
    STAGGER,
    anims.map((anim) =>
      Animated.sequence([
        Animated.timing(anim, { toValue: -4, duration: 300, useNativeDriver: true }),
         Animated.timing(anim, { toValue: -0, duration: 600, useNativeDriver: true }),
        Animated.timing(anim, { toValue:  2, duration: 300, useNativeDriver: true }),
      ])
    )
  ),
 
);
    wave.start();
    return () => wave.stop();
  }, []);

  return (
    <View className="flex-1 items-center justify-between py-20">

      {/* Title */}
      <View className="items-center pt-10">
        <View className="rounded-2xl bg-black pb-1.5 pr-1.5">
          <View className="h-15 w-50 items-center outline-2 outline-[#02ebf7] justify-center rounded-xl bg-white">
            <View className="flex-row">
              {WORD.split("").map((char, i) => (
                <Animated.Text
                  key={i}
                  className="text-3xl [font-family:Bungee-Regular] tracking-wider"
                  style={{ transform: [{ translateY: anims[i] }] }}
                >
                  {char}
                </Animated.Text>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View className="items-center gap-7 pb-7">
        <Button label="New Game"    onPress={() => router.push("/new-game")} />
        <Button label="Leaderboard" onPress={() => router.push("/leaderboard")} />
      </View>

    </View>
  );
}