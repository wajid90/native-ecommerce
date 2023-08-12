import { View, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Favoites from "./Favoites";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PersonScreen = ({ navigation }) => {
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
      } else {
        navigation.navigate("LoginPage");
      }
    } catch (error) {
      console.log("Error Retrivng the Data", error);
    }
  };

  const userLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["customer", "token"]);
      navigation.replace("Bottom Tab Navigator");
    } catch (error) {
      console.log("Error Retrivng the Data", error);
    }
  };
  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
      },
      {
        text: "Continue",
        onPress: () => userLogout(),
      },
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all save data on your device",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel clear cache"),
        },
        {
          text: "Continue",
          onPress: () => console.log("clear cache pressed"),
        },
      ]
    );
  };
  const deleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete Account", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel delete Account"),
      },
      {
        text: "Continue",
        onPress: () => console.log("delete Account"),
      },
      // { defaultIndex: 1 },
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="w-full">
          <Image
            source={require("../assets/OIP.jpeg")}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover",
            }}
          />
        </View>
        <View className="flex-1 items-center">
          <Image
            source={{
              uri: userData
                ? userData.avatar.url
                : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
            style={{
              height: 155,
              width: 155,
              borderRadius: 999,
              borderWidth: 2,
              resizeMode: "cover",
              marginTop: -90,
            }}
          />

          <Text className="font-bold text-gray-500 my-3">
            {userLogin ? userData.name : "Please Login in to User Acccount"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
              <View className="bg-gray-100 px-5 py-2 rounded-3xl border-2 border-gray-300">
                <Text>Login</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="bg-gray-100 px-5 py-2 rounded-3xl border-2 border-gray-300">
              <Text>{userData.email}</Text>
            </View>
          )}
          {userLogin === false ? (
            <View></View>
          ) : (
            <View className="w-[94%] shadow-3xl  my-3 bg-white rounded-xl">
              <TouchableOpacity
                onPress={() => navigation.navigate("Favorites")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginBottom: 10,
                  }}
                  className="border-b-2 border-gray-200"
                >
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color="black"
                    size={24}
                  />
                  <Text
                    className="text-gray-700 ml-5"
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      lineHeight: 26,
                    }}
                  >
                    Favorites
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginBottom: 10,
                  }}
                  className="border-b-2 border-gray-200"
                >
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color="black"
                    size={24}
                  />
                  <Text
                    className="text-gray-700 ml-5"
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      lineHeight: 26,
                    }}
                  >
                    Orders
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginBottom: 10,
                  }}
                  className="border-b-2 border-gray-200"
                >
                  <SimpleLineIcons name="bag" color="black" size={24} />
                  <Text
                    className="text-gray-700 ml-5"
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      lineHeight: 26,
                    }}
                  >
                    Cart
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => clearCache()}>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginBottom: 10,
                  }}
                  className="border-b-2 border-gray-200"
                >
                  <MaterialCommunityIcons
                    name="cached"
                    color="black"
                    size={24}
                  />
                  <Text
                    className="text-gray-700 ml-5"
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      lineHeight: 26,
                    }}
                  >
                    Clear cache
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAccount()}>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                  }}
                  className="border-b-2 border-gray-200"
                >
                  <AntDesign name="deleteuser" color="black" size={24} />
                  <Text
                    className="text-gray-700 ml-5"
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      lineHeight: 26,
                    }}
                  >
                    Delete Account
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()}>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginTop: 10,
                  }}
                  // className="border-b-2 border-gray-200"
                >
                  <AntDesign name="logout" color="black" size={24} />
                  <Text
                    className="text-gray-700 ml-5"
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      lineHeight: 26,
                    }}
                  >
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default PersonScreen;
