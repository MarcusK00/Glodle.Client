import { View,Text } from "react-native";

export default function(label:string){
    
    return(<View className="justify-center items-center rounded-xl bg-black/50 ">
        <Text className="text-center text-2xl text-white [font-family:Bungee-Regular]">{label}</Text>
    </View>);
}