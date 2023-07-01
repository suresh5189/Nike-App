import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  Pressable,
  ActivityIndicator
} from "react-native";
import { useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useGetProductQuery } from "../store/apiSlice";

const ProductDetailsScreen = ({route}) => {
  const id = route.params.id;

  const {data,isLoading,error} = useGetProductQuery(id);

  const product = data?.data;

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({product}));
  }

  if(isLoading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>Error Fetching the Product : {error.error}</Text>
  }

  return (
    <View>
      {/* Image Carousel */}
      <ScrollView>
      <FlatList
        data={product?.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <View style={{ padding: 20 }}>
        {/* Title */}
        <Text style={styles.title}>{product?.name}</Text>

        {/* Price */}
        <Text style={styles.price}>${product?.price}</Text>

        {/* Description */}
        <Text style={styles.description}>{product?.description}</Text>
      </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>

      {/* Navigation Icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  button:{
    position:'absolute',
    width:'90%',
    bottom:30,
    alignSelf:'center',
    backgroundColor:'black',
    alignItems:'center',
    padding:20,
    borderRadius:100,
    opacity:0.8
  },
  buttonText:{
    color:'white',
    fontWeight:'500',
    fontSize:16
  }
});

export default ProductDetailsScreen;
