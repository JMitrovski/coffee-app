import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { CoffeeCard } from "@/components/CoffeeCard";
import FlatListSeparator from "@/components/FlatListSeparator";
import { useCoffee } from "@/hooks/useCoffee";
import { router } from "expo-router";

export default function HomeScreen() {
  const { coffees, loading } = useCoffee();

  const _navigateToDetails = (id: number) => {
    router.navigate({
      pathname: "/(app)/coffee-details/[id]",
      params: { id },
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingVertical: 12 }}
          style={styles.flatListStyle}
          data={coffees}
          renderItem={({ item, index }) => (
            <CoffeeCard
              key={index}
              title={item.name}
              description={item.description}
              image={item.image}
              onPress={() => _navigateToDetails(item.id)}
              style={{
                width: "100%",
              }}
            />
          )}
          ItemSeparatorComponent={() => <FlatListSeparator />}
          keyExtractor={(item) => item.id.toString()}
        />
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
