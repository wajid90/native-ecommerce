import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              className={`${
                focused ? "bg-black text-white p-3  rounded-full" : ""
              }`}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "white" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused }) => (
            <View
              className={`${
                focused ? "bg-black text-white p-3  rounded-full" : ""
              }`}
            >
              <Ionicons
                name={"search-sharp"}
                size={24}
                color={focused ? "white" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Person"
        component={PersonScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              className={`${
                focused ? "bg-black text-white p-3  rounded-full" : ""
              }`}
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "white" : "gray"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
