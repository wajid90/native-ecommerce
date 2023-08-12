import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Heading = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between mx-2 mt-2 px-1">
      <Text className="font-semibold">New Revols</Text>
      <TouchableOpacity onPress={() => navigation.navigate("ProductList")}>
        <Ionicons size={18} color="black" name="grid" />
      </TouchableOpacity>
    </View>
  );
};

export default Heading;
