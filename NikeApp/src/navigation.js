import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";

import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductScreen from "./screens/ProductScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";
import TrackOrder from "./screens/TrackOrder";

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const numberOfItems = useSelector(selectNumberOfItems);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{contentStyle:{backgroundColor:'white'}}}
      >
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({navigation}) =>({
            headerTitleAlign:'center',
            headerRight: () => (
              <Pressable onPress={()=>{
                navigation.navigate('Cart');
              }} style={{flexDirection:'row'}}>
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{marginLeft:5,fontWeight:'500'}}>{numberOfItems}</Text>
              </Pressable>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                onPress={() => navigation.navigate('Track Order')}
                name="truck-delivery"
                size={25}
                color="gray"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" ,headerTitleAlign:'center',}}
        />
        <Stack.Screen name="Cart" component={ShoppingCart}  options={{headerTitleAlign:'center'}}/>
        <Stack.Screen name="Track Order" component={TrackOrder} options={{headerTitleAlign:'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
