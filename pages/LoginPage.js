import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { Platform, StatusBar } from "react-native";
import { Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AuthLogin, resetState } from "../redux/Auth/AuthSlice";

const LoginPage = ({ navigation }) => {
  const [obsecureText, useObsecureText] = useState(true);
  const dispatch = useDispatch();
  const { isLoadding, isError, message, customer, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (customer!==null && isSuccess === true && isError === false) {
      navigation.replace("Bottom Tab Navigator");
      dispatch(resetState());
    }
  }, [dispatch, isSuccess, isError,customer]);

  const signInSchma = Yup.object().shape({
    email: Yup.string()
      .email("Please Enter the Valid Email ...")
      .required("Please Enter your Email")
      .required("Email is Requied .."),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const inValidForm = () => {
    Alert.alert("Invaid Form", "Please Provide All required Fields ...", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      },
    ]);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View className="relative w-full bg-white">
          <Image
            source={require("../assets/privacy-policy-concept-illustration_114360-7853.jpg")}
            style={{
              width: "100%",
              height: 400,
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
          </View>
          <Text className="text-center font-bold text-gray-500 text-xl -mt-2">
            Unilimited Luxurius Furniture{" "}
          </Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={signInSchma}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              dispatch(AuthLogin(values));
              setTimeout(() => {
                resetForm();
              }, 200);
            }}
            className="flex flex-column gap-15"
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldTouched,
              isValid,
              /* and other goodies */
            }) => (
              <>
                <View className="w-full">
                  <View className="w-full mt-4 mb-2">
                    <Text className="w-full ml-5">Email</Text>
                    <View className="flex-row items-center mx-4 my-2 p-4 bg-gray-200  shadow-lg rounded-lg">
                      <MaterialCommunityIcons
                        name="email-outline"
                        size={24}
                        color="gray"
                        style={{
                          marginRight: 10,
                        }}
                      />
                      <TextInput
                        placeholder="Enter Your Email .."
                        onFocus={() => setFieldTouched("email")}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={() => setFieldTouched("email", "")}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                    <View className="w-[90%] mx-5">
                      {touched.email && errors.email && (
                        <Text className="text-xs -mt-2 text-red-700">
                          {errors.email}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View className="w-full  mb-2">
                    <Text className="w-full ml-5">Password</Text>
                    <View className="flex-row  items-center mx-4 my-2 p-4 bg-gray-200  shadow-lg rounded-lg">
                      <MaterialCommunityIcons
                        name="lock-outline"
                        size={24}
                        color="gray"
                        style={{
                          marginRight: 10,
                        }}
                      />
                      <TextInput
                        secureTextEntry={obsecureText}
                        placeholder="Enter Your Password .."
                        onFocus={() => setFieldTouched("password")}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={() => setFieldTouched("password", "")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{
                          flex: 1,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => useObsecureText(!obsecureText)}
                      >
                        <MaterialCommunityIcons
                          name={
                            obsecureText ? "eye-outline" : "eye-off-outline"
                          }
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>
                    <View className="w-[90%] mx-5">
                      {touched.password && errors.password && (
                        <Text className="text-xs -mt-2 text-red-700">
                          {errors.password}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                <Button
                  lodder={isLoadding}
                  title="L O G I N"
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text className="text-center p-3 border-2 mx-4 mb-2 border-gray-200 rounded-full font-bold text-gray-500">
                    Register
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
