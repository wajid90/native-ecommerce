import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import ProductCard from "./ProductCard";

const ProductListComponent = () => {
  const { products, isError, isSuccess, message, isLoadding } = useSelector(
    (state) => state.products
  );

  if (isLoadding) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size={24} color="black" />
      </View>
    );
  }
  return (
    <View className="mb-48 pb-1 bg-transparent">
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={{
          paddingLeft: 2,
          paddingRight: 5,
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 5,
            }}
          ></View>
        )}
      />
    </View>
  );
};

export default ProductListComponent;
