import { FlatList, StyleSheet, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import FlatListSeparator from "@/components/FlatListSeparator";
import { OrderCard } from "@/components/OrderCard";
import { ThemedText } from "@/components/ThemedText";
import { useCartContext } from "@/hooks/useCartContext";

export default function CartScreen() {
  const { cartItems, emptyCart, removeItemFromCart } = useCartContext();

  const _sendInTheOrder = () => {
    emptyCart();
  };

  return (
    <View style={styles.container}>
      {!cartItems.length ? (
        <ThemedText type="subtitle" style={{ opacity: 0.3 }}>
          Your cart is empty...
        </ThemedText>
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ paddingVertical: 12 }}
            style={styles.flatListStyle}
            data={cartItems}
            renderItem={({ item, index }) => (
              <OrderCard
                key={index}
                title={item.name}
                image={item.image}
                modifications={item.modifications}
                onPress={() => {
                  removeItemFromCart(item);
                }}
              />
            )}
            ItemSeparatorComponent={() => <FlatListSeparator />}
            keyExtractor={(item) => item.id.toString()}
          />
          <CustomButton
            style={{ marginBottom: 12 }}
            onPress={_sendInTheOrder}
            title="Send in the order"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  flatListStyle: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 12,
  },
});
