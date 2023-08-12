import { View, Text } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const images = [
  require("../assets/free-photo-of-abandoned-furniture-and-armchair-near-building-wall.jpeg"),
  require("../assets/pexels-photo-2343468.jpeg"),
  require("../assets/pexels-photo-2369535.jpeg"),
  require("../assets/pexels-photo-2986011.jpeg"),
  require("../assets/pexels-photo-3932957.jpeg"),
  require("../assets/pexels-photo-6580227.jpeg"),
];
const Careusal = () => {
  return (
    <SliderBox
      // ImageComponent={}
      images={images}
      sliderBoxHeight={200}
      onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
      dotColor="black"
      inactiveDotColor="gray"
      paginationBoxVerticalPadding={20}
      autoplay
      circleLoop
      resizeMethod={"resize"}
      resizeMode={"cover"}
      paginationBoxStyle={{
        position: "absolute",
        bottom : 0,
        padding: 0,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        paddingVertical: 10,
      }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        padding: 0,
        margin: 0,
        backgroundColor: "rgba(128, 128, 128, 0.92)",
      }}
      ImageComponentStyle={{ borderRadius: 15, width: "95%", marginTop: 5 }}
      imageLoadingColor="#2196F3"
    />
  );
};

export default Careusal;
