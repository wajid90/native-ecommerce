import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-url-polyfill/auto";
import BottomTabNavigator from "./components/BottomTabNavigator";
import Cart from "./screens/Cart";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { Provider } from "react-redux";
import { store } from "./store";
import PrroductList from "./components/PrroductList";
import LoginPage from "./pages/LoginPage";
import Orders from "./screens/Orders";
import Favoites from "./screens/Favoites";
import SignUp from "./pages/SignUp";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="Bottom Tab Navigator"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProductDetailsPage"
            component={ProductDetailsPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProductList"
            component={PrroductList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Favorites"
            component={Favoites}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
