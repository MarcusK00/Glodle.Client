import { Text, View } from "react-native";
import Button from "../components/Button";
import { useRouter } from "expo-router";
import { useRound } from "../api/hooks/getRound";
import { CountryMetric, Round } from "../api/types";
import CountryCard from "../components/CountryCard";
import { HandleAnswer } from "../utils/handleAnswer";
import { useState } from "react";
import { Alert } from "react-native";


export default function App() {
  const router = useRouter();
  const [roundKey,setRoundKey] = useState(0);
  const { round, loading } = useRound(roundKey);
  console.log("ROUND:", round);
console.log("UNIT:", round?.question.unit);
  const [score,setScore] = useState<number>(0);

const Submit = (guess: "A" | "B") => {
  const isCorrect = HandleAnswer(
    round!.countries[0],
    round!.countries[1],
    guess
  );

  if (isCorrect) {
    setScore(prev => prev + 1);
    setRoundKey(prev=>prev+1)
    console.log("Correct ✅");
  } else {
    setScore(0);
    router.back(); 
    Alert.alert("Wrong!","Game Over");
  }
};
  


  return (
    <View className="flex-1 items-center justify-between py-15">

      {/* Title */}
      <View className="items-center pr-50">
        <View className="bg-black rounded-2xl pb-1.5 pr-1.5">
          <View className="w-30 h-13 outline-3 rounded-xl items-center bg-white">
            <Text className="pt-3 text-xl [font-family:Bungee-Regular]">
              Glodle
            </Text>
          </View>
        </View>
      </View>
<View className="absolute top-15 right-4 z-50">
  <View className="bg-black rounded-2xl pb-1.5 pr-1.5">
    <View className="w-30 h-13 outline-2 outline-[#02ebf7] rounded-xl items-center justify-center bg-[#efff00]">
      <Text className="text-lg [font-family:Bungee-Regular]">
        Streak: {score}
      </Text>
    </View>
  </View>
</View>
   <View className="flex-1 w-full items-center justify-center">

  {/* TOP CARD */}
  <View className="items-center mb-10">
    <CountryCard
      onPress={() => Submit("A")}
      countryName={round?.countries[0].country}
      flag_url={round?.countries[0].flag_url}
    />
  </View>

  {/* MIDDLE METRIC */}
  <View className="absolute items-center justify-center">
    <View className="w-75 h-20 rounded-4xl justify-center items-center px-8 bg-black/80">
      <Text className="text-xl justify-center text-white [font-family:Bungee-Regular] text-center">
        {loading ? "Loading..." : round?.question.label}
      </Text>
{round?.question.unit && (
  <Text className="text-white [font-family:Bungee-Regular] text-md ">
    {round.question.unit}
  </Text>
)}
    </View>
  </View>

  {/* BOTTOM CARD */}
  <View className="items-center mt-20">
    <CountryCard
      onPress={() => Submit("B")}
      countryName={round?.countries[1].country}
      flag_url={round?.countries[1].flag_url}
    />
  </View>

</View>


    </View>
  );
}



   