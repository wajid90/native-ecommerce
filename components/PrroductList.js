import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductListComponent from "./ProductListComponent";

const PrroductList = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-row items-center w-fill mx-5 my-2 p-2 mt-2 rounded-full bg-gray-300">
          <TouchableOpacity
            className="mr-2"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-circle" size={30} color="white" />
          </TouchableOpacity>
          <Text className="font-bold text-md text-gray-500">Products</Text>
        </View>
        <ProductListComponent />
      </View>
    </SafeAreaView>
  );
};

export default PrroductList;
