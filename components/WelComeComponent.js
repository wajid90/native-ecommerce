import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const WelComeComponent = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex-1 mt-2 items-center">
        <Text className="text-2xl font-bold text-black">Find The Most</Text>
        <Text className="text-2xl font-bold text-gray-500">
          Luxurius Furniture
        </Text>
      </View>
      <View className="my-4 flex-row p-2 bg-gray-200 rounded-full mr-2 ml-2">
        <TextInput
          className="flex-1 pl-2"
          onPressIn={() => navigation.navigate("Search")}
          placeholder="Search good .."
        />
        <View className="p-2 bg-black text-white rounded-full">
          <Ionicons name="search" size={18} color="white" />
        </View>
      </View>
    </View>
  );
};

export default WelComeComponent;
