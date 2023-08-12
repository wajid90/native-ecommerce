import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import StarRating from "react-native-star-rating";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "react-native-heroicons/outline";

const ProductDetailsPage = ({ navigation }) => {
  const route = useRoute();
  const data = route.params.item;
  console.log(data);
  const [countData, setCountData] = useState(0);
  const [pressed, setPressed] = useState(false);
  return (
    <View className="flex-1 relative bg-white">
      <Image
        source={{
          uri: data.imageUrl,
        }}
        style={{
          aspectRatio: 1,
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: StatusBar.currentHeight,
          left: 1,
        }}
        className="w-[90%] flex-row justify-between mx-4 my-2 "
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 flex justify-center items-center  rounded-full w-10 h-10 bg-gray-200"
        >
          <Ionicons size={20} name="chevron-back" color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 flex justify-center items-center  rounded-full w-10 h-10 bg-gray-200">
          <Ionicons
            size={20}
            onPress={() => setPressed(!pressed)}
            name="heart"
            color={pressed === true ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -30,
          backgroundColor: "white",
          paddingTop: 10,
        }}
      >
        <View className="mt-2 mx-4 flex-row justify-between">
          <Text className="font-semibold text-lg">{data.title}</Text>
          <Text className="font-semibold text-lg">$ {data.price}</Text>
        </View>
        <View className="mt-2 mx-3 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <StarRating
              disabled={false}
              maxStars={5}
              rating={3.4}
              starSize={15}
              starStyle={{
                color: "#FFD700",
              }}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            <Text className="ml-1">(4.5)</Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => setCountData(countData > 0 ? countData - 1 : 0)}
              className="bg-gray-200 p-[1.9] rounded-full"
            >
              <MinusCircleIcon size={20} color="black" />
            </TouchableOpacity>
            <Text className="font-bold mx-1">{countData}</Text>
            <TouchableOpacity
              onPress={() => setCountData(countData + 1)}
              className="bg-gray-200 p-[1.9] rounded-full"
            >
              <PlusCircleIcon size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mx-4 mt-1">
          <Text className="text-md font-semibold py-2">Description</Text>
          <Text className="text-sm">{data.description}</Text>
        </View>

        <View className="mx-4 mt-3">
          <View className="flex-row justify-between bg-gray-200 py-1">
            <View className="flex-row px-2">
              <Ionicons size={20} name="location-outline" />
              <Text className="ml-1">Dallas</Text>
            </View>
            <View className="flex-row mx-2 px-2">
              <TruckIcon size={20} color="black" />
              <Text className="ml-1">Free Delivery</Text>
            </View>
          </View>
          <View className="flex  my-4">
            <TouchableOpacity className="flex-row justify-center p-4 mt-1 bg-gray-300 rounded-lg">
              <ShoppingBagIcon size={20} color="black" />
              <Text className="ml-1">ADD TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-center p-4 my-2 bg-black rounded-lg">
              <Text className="ml-1 text-white">BUY NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsPage;
