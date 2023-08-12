import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllproducts } from "../redux/Product/productSlice";
import { FlatList } from "react-native";

const FlatListComponent = () => {
  const { products, isError, isSuccess, message, isLoadding } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllproducts());
  }, []);

  return (
    <View className="bg-transparent">
      {isLoadding ? (
        <ActivityIndicator size={24} color={"black"} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCard item={item} />}
          horizontal
          contentContainerStyle={{ columnGap: 1 }}
        />
      )}
    </View>
  );
};

export default FlatListComponent;
