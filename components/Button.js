import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const Button = ({ title, onPress, isValid, lodder }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // disabled={isValid === false ? true : false}
      style={{
        backgroundColor: isValid === false ? "gray" : "#007dff",
      }}
      className="border-white  shadow shadow-gray-500 p-4 my-4 mx-3 rounded-full"
    >
      {lodder === false ? (
        <Text className="text-center text-gray-100 font-bold">{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;
