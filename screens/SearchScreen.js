import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../redux/Product/productSlice";
import ProductCard from "../components/ProductCard";
import { Image } from "react-native";
import SearchResultData from "../components/SearchResultData";

const SearchScreen = () => {
  const [searchKey, setSearchKey] = useState("");
  // const [searchResult, setSearchResult] = useState([]);

  const { searchproducts, isError, isSuccess, message, isLoadding } =
    useSelector((state) => state.products);

  const dispatch = useDispatch();

  const searchData = useMemo(() => {
    dispatch(searchProducts(searchKey));
  }, [searchKey]);

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
        className="bg-white"
      >
        <View className="flex-row mx-2 justify-between items-center px-2 py-2 bg-gray-200 rounded-3xl my-2">
          <View className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300 p-2">
            <Ionicons size={20} color="black" name="camera" />
          </View>
          <TextInput
            className="pl-2 flex-1"
            placeholder="Search Your product ..."
            value={searchKey}
            onChangeText={setSearchKey}
          />
          <View className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300 p-2">
            <TouchableOpacity onPress={searchData}>
              <Ionicons size={20} color="black" name="search" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {searchproducts.length === 0 ? (
          <View className="flex items-center justify-center bg-white">
            <Image
              source={require("../assets/no-data-concept-illustration_114360-536-_1_.jpg")}
              style={{
                width: 400,
                height: 600,

                resizeMode: "contain",
              }}
              alt="not Found"
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchproducts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <SearchResultData item={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
