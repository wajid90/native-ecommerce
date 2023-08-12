import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchResultData = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetailsPage", {
          item: item,
        })
      }
    >
      <View className="w-99 flex-row mt-3 p-2 bg-white mx-2 rounded">
        <Image
          source={{ uri: item.imageUrl }}
          className="w-20 h-20 rounded-lg  mt-1"
        />
        <View
          className="p-2"
          style={{
            width: "80%",
          }}
        >
          <Text className="font-bold">{item.title}</Text>
          <Text className="text-gray-400 text-md">price : {item.price}</Text>

          <Text
            style={{
              // justifyContent: "space-evenly",

              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            className="text-xs my-1 text-gray-400"
          >
            {item.description?.substring(0, 50)} .....
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultData;
