import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Platform } from "react-native";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WelComeComponent from "../components/WelComeComponent";
import Careusal from "../components/Careusal";
import Heading from "../components/Heading";
import FlatListComponent from "../components/FlatListComponent";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkExistingUser();
  }, []);
  const checkExistingUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("customer");

      if (userData !== null) {
        const user = JSON.parse(userData);
        setUserData(user);
        setUserLogin(true);
      }
    } catch (error) {
      console.log("Error Retrivng the Data", error);
    }
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-row px-4 py-2 justify-between items-center">
          <Ionicons size={22} name="location-outline" />
          <Text className="text-md">
            {userData ? userData.location : "Shanghi Chaina"}
          </Text>
          <View className="relative">
            <Ionicons
              size={22}
              name="cart-outline"
              onPress={() => navigation.navigate("Cart")}
            />
            <View className="absolute -top-1 -right-1 flex justify-center items-center rounded-full w-4 h-4 bg-black">
              <Text className="text-xs  text-white">3</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WelComeComponent />
        <Careusal />
        <Heading />
        <FlatListComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
