import React, { useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, KeyboardAvoidingView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useCoffeeDetails } from "@/hooks/useCoffeDetails";
import { ImageComponent } from "@/components/ImageComponent";
import { useCartContext } from "@/hooks/useCartContext";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import { ThemedView } from "@/components/ThemedView";
import { Transform } from "@/services";
import ModificationsFactory from "@/components/modifications-factory/ModificationsFactory";
import ModificationsDisplay from "@/components/ModificationsDisplay";

const CoffeDetails = () => {
  const { id } = useLocalSearchParams();
  const [selectedCoffe, setSelectedCoffe] = useCoffeeDetails(id as string);
  const { addItemToCart } = useCartContext();

  const _addItemToCart = useCallback(() => {
    addItemToCart(selectedCoffe!);
    router.back();
  }, [addItemToCart, selectedCoffe]);

  const _renderModifications = useMemo(() => {
    return selectedCoffe?.modifications?.map((el, index) => {
      const coffeContainsModificator = selectedCoffe?.modifications?.find(
        (mod) => mod.id === el.id
      );
      const useValue = coffeContainsModificator ?? el;
      return <ModificationsFactory key={index} item={useValue} />;
    });
  }, [selectedCoffe]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{ flex: 1, alignItems: "center" }}
    >
      {selectedCoffe ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollStyles}
        >
          <ImageComponent style={styles.bgImage} url={selectedCoffe?.image!} />
          <ThemedView style={styles.subviews}>
            <ThemedText type="title">
              {Transform.capitalizeText(selectedCoffe?.name!)}
            </ThemedText>
            <ThemedText type="defaultSemiBold">
              {selectedCoffe?.description}
            </ThemedText>
          </ThemedView>
          <ThemedView
            style={[
              [styles.subviews, styles.modificationsSubview, { width: "100%" }],
            ]}
          >
            <ModificationsDisplay />
          </ThemedView>

          <ThemedView style={[styles.subviews, styles.modificationsSubview]}>
            {_renderModifications}
          </ThemedView>
          <CustomButton
            style={{ marginTop: 32 }}
            title="Add item to cart"
            onPress={_addItemToCart}
          />
        </ScrollView>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default CoffeDetails;

const styles = StyleSheet.create({
  scrollStyles: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 44,
  },
  bgImage: { width: "100%", height: 300 },
  modificationsSubview: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  subviews: {
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
    paddingHorizontal: 20,
  },
});
