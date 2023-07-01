import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import CartListItem from "../components/CartListItem";
import {
  selectDeliveryPrice,
  selectSubTotal,
  selectTotal,
  cartSlice
} from "../store/cartSlice";
import { useCreateOrderMutation } from "../store/apiSlice";
import { useDispatch } from "react-redux";

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubTotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  const dispatch = useDispatch();

  return (
    <View style={styles.totalContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>SubTotal</Text>
        <Text style={styles.text}>{subtotal} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{deliveryFee} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  );
};

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: "Vin Diesel",
        address: "My Home",
        email: "example@gmail.com",
      },
    });

    if (result.data?.status === "OK") {
      Alert.alert(
        "Order has been Submitted",
        `Your Order Reference Is : ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
  };

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>
          CheckOut
          {isLoading && <ActivityIndicator />}
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    position: "absolute",
    width: "90%",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "black",
    alignItems: "center",
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ShoppingCart;
