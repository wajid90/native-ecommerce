import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ item }) => {
  // console.log(item.imageUrl);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetailsPage", {
          item: item,
        })
      }
    >
      <View
        style={{
          width: 163,
          height: 230,
          marginLeft: 12,
          marginTop: 10,
          shadowRadius: 10,
          shadowColor: "gray",
          shadowRadius: 10,
          shadowOpacity: 8,
          borderRadius: 10,
          shadowOffset: { width: 0, height: 10 },
        }}
        className="relative"
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 5,
          }}
          alt="img"
        />
        <View className="w-[80%] absolute bottom-3 left-2">
          <Text className="font-bold text-white my-2 text-sm">
            {item.title.split(" ")[0]}
          </Text>
          <View className="flex-row justify-between items-center ">
            <View>
              <Text className="font-bold text-xs text-white mb-1">
                Price :{item.price}
              </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={3.4}
                starSize={12}
                starStyle={{
                  color: "yellow",
                }}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
            <TouchableOpacity className="p-1 bg-black rounded-full">
              <Ionicons name="add-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
