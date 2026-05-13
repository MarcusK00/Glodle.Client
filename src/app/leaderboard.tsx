import { Text, View } from "react-native";
import Button from "../components/Button";
import { useRouter } from "expo-router";


export default function leaderboard() {
  const router = useRouter();


  return (
 <View className="flex-1 items-center justify-between py-20">
  
  {/* Title */}
 <View className="items-center pr-50">
    <View className="bg-black rounded-2xl pb-1.5 pr-1.5">
      <View className="w-30 h-13 outline-3 rounded-xl items-center bg-white">
        <Text className="pt-3 text-xl [font-family:Bungee-Regular] ">
          Glodle
        </Text>
      </View>
    </View>
  </View>


<View className="pb-5">
 <Button label="Back" onPress={() =>router.back()}/>
</View>
  </View>
    
  );
}